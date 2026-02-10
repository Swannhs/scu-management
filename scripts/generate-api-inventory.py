#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVICES_DIR = ROOT / 'services'
OUTPUT_DIR = ROOT / 'docs' / 'api-inventory'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
METHODS = {'GET', 'POST', 'PATCH', 'PUT', 'DELETE'}

def collect_implemented():
    endpoints = []
    for service in SERVICES_DIR.iterdir():
        if not service.is_dir():
            continue
        service_name = service.name
        for file in service.rglob('*'):
            if not file.is_file() or file.suffix.lower() not in {'.ts', '.js', '.py', '.java', '.php'}:
                continue
            rel = str(file.relative_to(ROOT))
            text = file.read_text(errors='ignore')
            if file.suffix in {'.ts', '.js'}:
                base_match = re.search(r"@Controller\(([^)]*)\)", text)
                base = base_match.group(1).strip().strip("`\"'") if base_match else ''
                for mm in re.finditer(r"@(Get|Post|Patch|Put|Delete)\(([^)]*)\)\s*(?:@[\s\S]*?)?\s*async\s+(\w+)\s*\(", text):
                    full = '/' + '/'.join([x.strip('/') for x in [base, mm.group(2).strip().strip("`\"'")] if x])
                    endpoints.append({'service': service_name, 'method': mm.group(1).upper(), 'path': full, 'sourceFile': rel, 'handler': mm.group(3)})
                for mm in re.finditer(r"(?:app|router)\.(get|post|patch|put|delete)\(\s*['\"]([^'\"]+)['\"]", text):
                    endpoints.append({'service': service_name, 'method': mm.group(1).upper(), 'path': mm.group(2), 'sourceFile': rel, 'handler': ''})
            if file.suffix == '.py':
                for mm in re.finditer(r"@(app|router)\.(get|post|patch|put|delete)\(\s*['\"]([^'\"]+)['\"]", text):
                    endpoints.append({'service': service_name, 'method': mm.group(2).upper(), 'path': mm.group(3), 'sourceFile': rel, 'handler': ''})
            if file.suffix == '.java':
                base = ''
                base_match = re.search(r"@RequestMapping\(\s*['\"]([^'\"]+)['\"]", text)
                if base_match:
                    base = base_match.group(1)
                for dec, method in [('GetMapping', 'GET'), ('PostMapping', 'POST'), ('PatchMapping', 'PATCH'), ('PutMapping', 'PUT'), ('DeleteMapping', 'DELETE')]:
                    for mm in re.finditer(rf"@{dec}\(\s*['\"]([^'\"]+)['\"]", text):
                        p = mm.group(1)
                        full = '/' + '/'.join([x.strip('/') for x in [base, p] if x])
                        endpoints.append({'service': service_name, 'method': method, 'path': full, 'sourceFile': rel, 'handler': ''})
            if file.suffix == '.php':
                for mm in re.finditer(r"Route::(get|post|patch|put|delete)\(\s*['\"]([^'\"]+)['\"]", text):
                    endpoints.append({'service': service_name, 'method': mm.group(1).upper(), 'path': mm.group(2), 'sourceFile': rel, 'handler': ''})
    seen, dedup = set(), []
    for e in endpoints:
        k = (e['service'], e['method'], e['path'], e['sourceFile'], e['handler'])
        if k in seen:
            continue
        seen.add(k)
        dedup.append(e)
    return sorted(dedup, key=lambda x: (x['service'], x['path'], x['method']))

def collect_documented():
    endpoints = []
    for file in ROOT.rglob('*.json'):
        if not file.is_file():
            continue
        rel = str(file.relative_to(ROOT))
        if 'node_modules' in rel:
            continue
        name = file.name.lower()
        if not (name in {'openapi.json', 'swagger.json', 'combined.openapi.json', 'openapi-merged.json'} or '/openapi/' in rel):
            continue
        try:
            spec = json.loads(file.read_text())
        except Exception:
            continue
        paths = spec.get('paths') if isinstance(spec, dict) else None
        if not isinstance(paths, dict):
            continue
        parts = rel.split('/')
        service = parts[1] if parts[0] == 'services' and len(parts) > 1 else 'repo'
        for p, ops in paths.items():
            if not isinstance(ops, dict):
                continue
            for method, op in ops.items():
                method = method.upper()
                if method in METHODS:
                    endpoints.append({'service': service, 'method': method, 'path': p, 'sourceFile': rel, 'handler': op.get('operationId', '') if isinstance(op, dict) else ''})
    seen, dedup = set(), []
    for e in endpoints:
        k = (e['service'], e['method'], e['path'], e['sourceFile'])
        if k in seen:
            continue
        seen.add(k)
        dedup.append(e)
    return sorted(dedup, key=lambda x: (x['service'], x['path'], x['method']))

def render_report(implemented, documented):
    impl_map, doc_map = {}, {}
    for e in implemented:
        impl_map.setdefault((e['service'], e['method'], e['path']), []).append(e)
    for e in documented:
        doc_map.setdefault((e['service'], e['method'], e['path']), []).append(e)
    both = sorted(set(impl_map) & set(doc_map))
    impl_only = sorted(set(impl_map) - set(doc_map))
    doc_only = sorted(set(doc_map) - set(impl_map))
    required_social = [
      ('campus-social-service', 'POST', '/v1/groups/:id/requests/:userId/approve'),
      ('campus-social-service', 'POST', '/v1/groups/:id/requests/:userId/reject'),
      ('campus-social-service', 'GET', '/v1/posts/:id'),
      ('campus-social-service', 'GET', '/v1/posts/:id/comments'),
      ('campus-social-service', 'DELETE', '/v1/posts/:id/comments/:commentId'),
      ('campus-social-service', 'POST', '/v1/posts/:id/report'),
      ('campus-social-service', 'POST', '/v1/calls/rooms/:roomId/end'),
      ('campus-social-service', 'GET', '/v1/calls/rooms/:roomId/participants'),
    ]
    neither = [r for r in required_social if r not in impl_map and r not in doc_map]
    services = sorted({e['service'] for e in implemented + documented})
    lines = ['# API Done vs Remaining Report', '', '## Summary Count by Service', '', '| Service | Total implemented | Total documented | Missing docs | Missing endpoints |', '|---|---:|---:|---:|---:|']
    for service in services:
        iset = {k for k in impl_map if k[0] == service}
        dset = {k for k in doc_map if k[0] == service}
        lines.append(f'| {service} | {len(iset)} | {len(dset)} | {len(iset-dset)} | {len(dset-iset)} |')
    def add_section(title, keys, source):
        lines.extend(['', f'## {title}', ''])
        if not keys:
            lines.append('- None')
            return
        for key in keys:
            ref = source[key][0]
            handler = f" · `{ref['handler']}()`" if ref.get('handler') else ''
            lines.append(f"- `{key[0]} {key[1]} {key[2]}` → `{ref['sourceFile']}`{handler}")
    add_section('1) Implemented AND documented (DONE)', both, impl_map)
    add_section('2) Implemented BUT not documented (DOC MISSING)', impl_only, impl_map)
    add_section('3) Documented BUT not implemented (API MISSING)', doc_only, doc_map)
    lines.extend(['', '## 4) Neither implemented nor documented (Roadmap/Social required gap)', ''])
    lines.extend([f'- `{s} {m} {p}`' for s, m, p in neither] if neither else ['- None'])
    return '\n'.join(lines) + '\n'

if __name__ == '__main__':
    impl = collect_implemented()
    doc = collect_documented()
    (OUTPUT_DIR / 'implemented.endpoints.json').write_text(json.dumps(impl, indent=2) + '\n')
    (OUTPUT_DIR / 'documented.endpoints.json').write_text(json.dumps(doc, indent=2) + '\n')
    (OUTPUT_DIR / 'done-vs-remaining.md').write_text(render_report(impl, doc))
