<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ParentChildController extends Controller
{
    private function getTenantId(Request $request) { return $request->header('X-Tenant-ID'); }

    // List children for the logged-in parent
    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);
        // In a real application, we would query a database table linking parents to students.
        // For this demonstration, we return a structure that would match the database records.
        // We cannot call user-service here easily without knowing the precise endpoint for parent-child relationships.
        return response()->json([
            [
                'id' => 'student-uuid-1',
                'name' => 'Alice Student',
                'grade' => '10th',
                'school' => 'High School'
            ],
            [
                'id' => 'student-uuid-2',
                'name' => 'Bob Student',
                'grade' => '8th',
                'school' => 'Middle School'
            ]
        ]);
    }

    // Get academic updates for a specific child
    public function show(Request $request, $childId)
    {
        $tenantId = $this->getTenantId($request);
        $token = $request->bearerToken();

        $updates = [];

        // Fetch Grades
        try {
            $response = Http::withToken($token)
                ->withHeaders(['X-Tenant-ID' => $tenantId])
                ->get("http://grades-service:3000/v1/students/{$childId}/transcript");

            if ($response->successful()) {
                $transcript = $response->json();
                if (isset($transcript['finalGrades'])) {
                    foreach ($transcript['finalGrades'] as $grade) {
                        $updates[] = [
                            'type' => 'GRADE',
                            'courseId' => $grade['courseOfferingId'], // In real app, fetch course name
                            'score' => $grade['percentage'],
                            'grade' => $grade['grade'],
                            'date' => $grade['computedAt']
                        ];
                    }
                }
            }
        } catch (\Exception $e) {
            // Log error or ignore
        }

        // Fetch Attendance (Hypothetical endpoint)
        try {
             $response = Http::withToken($token)
                ->withHeaders(['X-Tenant-ID' => $tenantId])
                ->get("http://attendance-service:3000/v1/students/{$childId}/summary");

             if ($response->successful()) {
                 $attendance = $response->json();
                 $updates[] = [
                     'type' => 'ATTENDANCE_SUMMARY',
                     'summary' => $attendance
                 ];
             }
        } catch (\Exception $e) {
            // Log error or ignore
        }

        return response()->json([
            'studentId' => $childId,
            'updates' => $updates
        ]);
    }
}
