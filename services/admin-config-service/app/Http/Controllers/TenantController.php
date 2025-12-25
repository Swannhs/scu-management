<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TenantController extends Controller
{
    public function index()
    {
        return response()->json(Tenant::with(['campuses', 'domains'])->get());
    }

    public function show($id)
    {
        return response()->json(Tenant::with(['campuses', 'domains'])->findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:tenants,slug|max:50',
            'type' => ['required', Rule::in(['K12', 'HIGHER_ED'])],
            'domain' => 'required|string|unique:domains,hostname',
            'admin_email' => 'required|email',
        ]);

        $tenant = DB::transaction(function () use ($validated) {
            $tenant = Tenant::create([
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'type' => $validated['type'],
                'status' => 'ACTIVE',
            ]);

            $tenant->campuses()->create([
                'name' => 'Main Campus',
                'is_main' => true,
            ]);

            $tenant->domains()->create([
                'hostname' => $validated['domain'],
                'is_primary' => true,
            ]);

            // TODO: Emit 'tenant.created' event via RabbitMQ

            return $tenant;
        });

        return response()->json($tenant->load(['campuses', 'domains']), 201);
    }

    public function resolveDomain(Request $request)
    {
        $hostname = $request->query('hostname');
        
        $domain = \App\Models\Domain::where('hostname', $hostname)->first();
        
        if (!$domain) {
            return response()->json(['error' => 'Domain not resolved'], 404);
        }

        return response()->json([
            'tenant_id' => $domain->tenant_id,
            'hostname' => $domain->hostname
        ]);
    }
}
