export function serverSideResponse(response: any) {
    if (!response.ok) {
        return null;
    }
    return response.json();
}
