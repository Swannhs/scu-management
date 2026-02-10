# API Done vs Remaining Report

## Summary Count by Service

| Service | Total implemented | Total documented | Missing docs | Missing endpoints |
|---|---:|---:|---:|---:|
| admin-config-service | 12 | 0 | 12 | 0 |
| analytics-service | 2 | 0 | 2 | 0 |
| api-gateway | 0 | 20 | 0 | 20 |
| audit-logging-service | 2 | 0 | 2 | 0 |
| campus-social-service | 53 | 0 | 53 | 0 |
| course-service | 6 | 0 | 6 | 0 |
| document-service | 15 | 0 | 15 | 0 |
| enrollment-service | 18 | 0 | 18 | 0 |
| faculty-service | 1 | 0 | 1 | 0 |
| finance-service | 32 | 0 | 32 | 0 |
| hostel-service | 4 | 0 | 4 | 0 |
| maintenance-service | 2 | 0 | 2 | 0 |
| notifications-service | 2 | 0 | 2 | 0 |
| parent-portal-service | 7 | 0 | 7 | 0 |
| placement-service | 14 | 0 | 14 | 0 |
| social-service | 8 | 0 | 8 | 0 |
| transport-service | 2 | 0 | 2 | 0 |
| user-service | 9 | 0 | 9 | 0 |

## 1) Implemented AND documented (DONE)

- None

## 2) Implemented BUT not documented (DOC MISSING)

- `admin-config-service GET /` → `services/admin-config-service/routes/web.php`
- `admin-config-service GET departments` → `services/admin-config-service/routes/api.php`
- `admin-config-service GET programs` → `services/admin-config-service/routes/api.php`
- `admin-config-service GET resolve-domain` → `services/admin-config-service/routes/api.php`
- `admin-config-service GET terms` → `services/admin-config-service/routes/api.php`
- `admin-config-service PATCH departments/{id}` → `services/admin-config-service/routes/api.php`
- `admin-config-service PATCH programs/{id}` → `services/admin-config-service/routes/api.php`
- `admin-config-service PATCH terms/{id}` → `services/admin-config-service/routes/api.php`
- `admin-config-service POST departments` → `services/admin-config-service/routes/api.php`
- `admin-config-service POST programs` → `services/admin-config-service/routes/api.php`
- `admin-config-service POST terms` → `services/admin-config-service/routes/api.php`
- `admin-config-service POST users/{userId}/roles` → `services/admin-config-service/routes/api.php`
- `analytics-service GET /` → `services/analytics-service/main.py`
- `analytics-service GET /health` → `services/analytics-service/main.py`
- `audit-logging-service GET /` → `services/audit-logging-service/main.py`
- `audit-logging-service GET /health` → `services/audit-logging-service/main.py`
- `campus-social-service DELETE /v1/conversations/:id/members/:userId` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `removeMember()`
- `campus-social-service DELETE /v1/posts/:id/comments/:commentId` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `deleteComment()`
- `campus-social-service GET /v1/calls/rooms/:roomId/participants` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `listParticipants()`
- `campus-social-service GET /v1/chats` → `services/campus-social-service/src/social/controllers/chats.controller.ts` · `listChats()`
- `campus-social-service GET /v1/chats/:chatId/messages` → `services/campus-social-service/src/social/controllers/chats.controller.ts` · `listMessages()`
- `campus-social-service GET /v1/conversations` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `listConversations()`
- `campus-social-service GET /v1/conversations/:id/messages` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `listMessages()`
- `campus-social-service GET /v1/feed` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `getFeed()`
- `campus-social-service GET /v1/friends` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `listFriends()`
- `campus-social-service GET /v1/friends/requests` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `listRequests()`
- `campus-social-service GET /v1/groups` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `listGroups()`
- `campus-social-service GET /v1/groups/:id` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `getGroup()`
- `campus-social-service GET /v1/groups/:id/members` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `listMembers()`
- `campus-social-service GET /v1/groups/:id/posts` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `listGroupPosts()`
- `campus-social-service GET /v1/notifications` → `services/campus-social-service/src/social/controllers/notifications.controller.ts` · `listNotifications()`
- `campus-social-service GET /v1/posts` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `getPosts()`
- `campus-social-service GET /v1/posts/:id` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `getPost()`
- `campus-social-service GET /v1/posts/:id/comments` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `listComments()`
- `campus-social-service GET /v1/profiles/:userId` → `services/campus-social-service/src/social/controllers/profiles.controller.ts` · `getByUser()`
- `campus-social-service GET /v1/profiles/me` → `services/campus-social-service/src/social/controllers/profiles.controller.ts` · `getMe()`
- `campus-social-service PATCH /v1/conversations/:id` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `updateGroup()`
- `campus-social-service PATCH /v1/groups/:id/members/:userId` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `patchMember()`
- `campus-social-service PATCH /v1/profiles/me` → `services/campus-social-service/src/social/controllers/profiles.controller.ts` · `patchMe()`
- `campus-social-service POST /v1/calls/:id/end` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `endCall()`
- `campus-social-service POST /v1/calls/:id/join` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `joinCall()`
- `campus-social-service POST /v1/calls/rooms` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `createCallRoom()`
- `campus-social-service POST /v1/calls/rooms/:roomId/end` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `endRoom()`
- `campus-social-service POST /v1/calls/rooms/:roomId/join` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `joinRoom()`
- `campus-social-service POST /v1/calls/rooms/:roomId/leave` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `leaveRoom()`
- `campus-social-service POST /v1/chats/:chatId/messages` → `services/campus-social-service/src/social/controllers/chats.controller.ts` · `sendMessage()`
- `campus-social-service POST /v1/chats/dm` → `services/campus-social-service/src/social/controllers/chats.controller.ts` · `createDm()`
- `campus-social-service POST /v1/conversations/:id/calls` → `services/campus-social-service/src/social/controllers/calls.controller.ts` · `startCall()`
- `campus-social-service POST /v1/conversations/:id/members` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `addMembers()`
- `campus-social-service POST /v1/conversations/:id/messages` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `sendMessage()`
- `campus-social-service POST /v1/conversations/direct` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `createDirect()`
- `campus-social-service POST /v1/conversations/group` → `services/campus-social-service/src/social/controllers/conversations.controller.ts` · `createGroup()`
- `campus-social-service POST /v1/events` → `services/campus-social-service/src/social/controllers/events.controller.ts` · `ingestEvent()`
- `campus-social-service POST /v1/friends/requests` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `sendRequest()`
- `campus-social-service POST /v1/friends/requests/:id/accept` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `acceptRequest()`
- `campus-social-service POST /v1/friends/requests/:id/cancel` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `cancelRequest()`
- `campus-social-service POST /v1/friends/requests/:id/reject` → `services/campus-social-service/src/social/controllers/friends.controller.ts` · `rejectRequest()`
- `campus-social-service POST /v1/groups` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `createGroup()`
- `campus-social-service POST /v1/groups/:groupId/chat` → `services/campus-social-service/src/social/controllers/chats.controller.ts` · `createGroupChat()`
- `campus-social-service POST /v1/groups/:id/join` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `joinGroup()`
- `campus-social-service POST /v1/groups/:id/leave` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `leaveGroup()`
- `campus-social-service POST /v1/groups/:id/requests/:userId/approve` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `approveRequest()`
- `campus-social-service POST /v1/groups/:id/requests/:userId/reject` → `services/campus-social-service/src/social/controllers/groups.controller.ts` · `rejectRequest()`
- `campus-social-service POST /v1/notifications/:id/read` → `services/campus-social-service/src/social/controllers/notifications.controller.ts` · `markRead()`
- `campus-social-service POST /v1/posts` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `createPost()`
- `campus-social-service POST /v1/posts/:id/comments` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `addComment()`
- `campus-social-service POST /v1/posts/:id/react` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `reactToPost()`
- `campus-social-service POST /v1/posts/:id/report` → `services/campus-social-service/src/social/controllers/posts.controller.ts` · `reportPost()`
- `campus-social-service PUT /v1/profiles/me` → `services/campus-social-service/src/social/controllers/profiles.controller.ts` · `updateMe()`
- `course-service GET /v1/programs` → `services/course-service/src/programs/programs.controller.ts` · `findAll()`
- `course-service GET /v1/programs/:id/structure` → `services/course-service/src/programs/programs.controller.ts` · `getStructure()`
- `course-service GET /v1/sessions` → `services/course-service/src/sections/sessions.controller.ts` · `getMySessions()`
- `course-service GET /v1/sessions/list` → `services/course-service/src/sections/sessions.controller.ts` · `getSessionsBySectionIds()`
- `course-service POST /v1/programs` → `services/course-service/src/programs/programs.controller.ts` · `create()`
- `course-service POST /v1/sections` → `services/course-service/src/sections/sections.controller.ts` · `getRoster()`
- `document-service DELETE /v1/files/:fileId` → `services/document-service/src/app.js`
- `document-service GET /user/:uid/photos/:file` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET /v1/files/:fileId` → `services/document-service/src/app.js`
- `document-service GET /v1/files/:fileId/download-url` → `services/document-service/src/app.js`
- `document-service GET etag fn` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET json escape` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET json replacer` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET json spaces` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET jsonp callback name` → `services/document-service/node_modules/express/lib/response.js`
- `document-service GET query parser fn` → `services/document-service/node_modules/express/lib/request.js`
- `document-service GET subdomain offset` → `services/document-service/node_modules/express/lib/request.js`
- `document-service GET trust proxy fn` → `services/document-service/node_modules/express/lib/request.js`
- `document-service POST /v1/files/:fileId/share` → `services/document-service/src/app.js`
- `document-service POST /v1/files/complete-upload` → `services/document-service/src/app.js`
- `document-service POST /v1/files/initiate-upload` → `services/document-service/src/app.js`
- `enrollment-service DELETE /v1/enrollments/{enrollment_id}` → `services/enrollment-service/main.py`
- `enrollment-service GET /health` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/applications` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/applications/me` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/intake-terms` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/sections/{section_id}/roster` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/students` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/students/me` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/students/{student_id}` → `services/enrollment-service/main.py`
- `enrollment-service GET /v1/students/{student_id}/enrollments` → `services/enrollment-service/main.py`
- `enrollment-service PATCH /v1/applications/{application_id}/documents/{doc_id}/verify` → `services/enrollment-service/main.py`
- `enrollment-service PATCH /v1/applications/{application_id}/status` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/applications` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/applications/{application_id}/approve` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/applications/{application_id}/documents` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/enrollments` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/intake-terms` → `services/enrollment-service/main.py`
- `enrollment-service POST /v1/students` → `services/enrollment-service/main.py`
- `faculty-service GET /` → `services/faculty-service/routes/web.php`
- `finance-service DELETE /v1/invoices/{id}/items/{itemId}` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service GET /api/v1/finance/student-fees/{studentId}` → `services/finance-service/src/main/java/com/university/finance/controller/FeeController.java`
- `finance-service GET /api/v1/finance/terms` → `services/finance-service/src/main/java/com/university/finance/controller/FeeController.java`
- `finance-service GET /v1/finance/accounts/{id}` → `services/finance-service/src/main/java/com/university/finance/controller/AccountController.java`
- `finance-service GET /v1/finance/journals/{id}` → `services/finance-service/src/main/java/com/university/finance/controller/JournalEntryController.java`
- `finance-service GET /v1/invoices/my` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service GET /v1/invoices/{id}` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service GET /v1/payments/{id}` → `services/finance-service/src/main/java/com/university/finance/controller/PaymentController.java`
- `finance-service GET /v1/payroll/runs/{id}/payslips` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service GET /v1/payroll/staff-profiles` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service PATCH /v1/finance/accounts/{id}` → `services/finance-service/src/main/java/com/university/finance/controller/AccountController.java`
- `finance-service POST /api/v1/finance/student-fees/generate` → `services/finance-service/src/main/java/com/university/finance/controller/FeeController.java`
- `finance-service POST /api/v1/finance/terms` → `services/finance-service/src/main/java/com/university/finance/controller/FeeController.java`
- `finance-service POST /v1/finance/accounts/{id}/archive` → `services/finance-service/src/main/java/com/university/finance/controller/AccountController.java`
- `finance-service POST /v1/finance/journals/{id}/reverse` → `services/finance-service/src/main/java/com/university/finance/controller/JournalEntryController.java`
- `finance-service POST /v1/finance/periods/{id}/close` → `services/finance-service/src/main/java/com/university/finance/controller/AccountingPeriodController.java`
- `finance-service POST /v1/finance/periods/{id}/reopen` → `services/finance-service/src/main/java/com/university/finance/controller/AccountingPeriodController.java`
- `finance-service POST /v1/invoices/{id}/issue` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service POST /v1/invoices/{id}/items` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service POST /v1/invoices/{id}/void` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service POST /v1/invoices/{id}/waivers` → `services/finance-service/src/main/java/com/university/finance/controller/InvoiceController.java`
- `finance-service POST /v1/payroll/runs` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service POST /v1/payroll/runs/{id}/approve` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service POST /v1/payroll/runs/{id}/calculate` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service POST /v1/payroll/runs/{id}/pay` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service POST /v1/payroll/staff-profiles` → `services/finance-service/src/main/java/com/university/finance/controller/PayrollController.java`
- `finance-service POST /v1/refunds/{id}/approve` → `services/finance-service/src/main/java/com/university/finance/controller/RefundController.java`
- `finance-service POST /v1/refunds/{id}/execute` → `services/finance-service/src/main/java/com/university/finance/controller/RefundController.java`
- `finance-service POST /v1/students/{studentId}/wallet/credit` → `services/finance-service/src/main/java/com/university/finance/controller/StudentWalletController.java`
- `finance-service POST /v1/students/{studentId}/wallet/debit` → `services/finance-service/src/main/java/com/university/finance/controller/StudentWalletController.java`
- `finance-service POST /v1/vendor-bills/{id}/approve` → `services/finance-service/src/main/java/com/university/finance/controller/VendorBillController.java`
- `finance-service POST /v1/vendor-bills/{id}/pay` → `services/finance-service/src/main/java/com/university/finance/controller/VendorBillController.java`
- `hostel-service GET /` → `services/hostel-service/routes/web.php`
- `hostel-service GET /hostels` → `services/hostel-service/routes/api.php`
- `hostel-service POST /allotments` → `services/hostel-service/routes/api.php`
- `hostel-service POST /hostels` → `services/hostel-service/routes/api.php`
- `maintenance-service GET /` → `services/maintenance-service/index.js`
- `maintenance-service GET /health` → `services/maintenance-service/index.js`
- `notifications-service GET /` → `services/notifications-service/main.py`
- `notifications-service GET /health` → `services/notifications-service/main.py`
- `parent-portal-service GET /` → `services/parent-portal-service/routes/web.php`
- `parent-portal-service GET /parents/children` → `services/parent-portal-service/routes/api.php`
- `parent-portal-service GET /parents/children/{childId}/updates` → `services/parent-portal-service/routes/api.php`
- `parent-portal-service GET /parents/me` → `services/parent-portal-service/routes/api.php`
- `parent-portal-service POST /parents` → `services/parent-portal-service/routes/api.php`
- `parent-portal-service POST /parents/links` → `services/parent-portal-service/routes/api.php`
- `parent-portal-service POST /parents/links/{id}/approve` → `services/parent-portal-service/routes/api.php`
- `placement-service GET /v1/applications` → `services/placement-service/src/applications/applications.controller.ts` · `findAll()`
- `placement-service GET /v1/applications/my` → `services/placement-service/src/applications/applications.controller.ts` · `findMyApplications()`
- `placement-service GET /v1/companies` → `services/placement-service/src/companies/companies.controller.ts` · `findAll()`
- `placement-service GET /v1/companies/:id` → `services/placement-service/src/companies/companies.controller.ts` · `findOne()`
- `placement-service GET /v1/job-posts` → `services/placement-service/src/job-posts/job-posts.controller.ts` · `findAll()`
- `placement-service GET /v1/job-posts/:id` → `services/placement-service/src/job-posts/job-posts.controller.ts` · `findOne()`
- `placement-service GET /v1/offers/my` → `services/placement-service/src/offers/offers.controller.ts` · `findMyOffers()`
- `placement-service PATCH /v1/applications/:id/status` → `services/placement-service/src/applications/applications.controller.ts` · `updateStatus()`
- `placement-service PATCH /v1/offers/:id/accept` → `services/placement-service/src/offers/offers.controller.ts` · `acceptOffer()`
- `placement-service POST /v1/applications/:id/offer` → `services/placement-service/src/applications/applications.controller.ts` · `createOffer()`
- `placement-service POST /v1/companies` → `services/placement-service/src/companies/companies.controller.ts` · `create()`
- `placement-service POST /v1/job-posts` → `services/placement-service/src/job-posts/job-posts.controller.ts` · `create()`
- `placement-service POST /v1/job-posts/:id/apply` → `services/placement-service/src/job-posts/job-posts.controller.ts` · `apply()`
- `placement-service PUT /v1/companies/:id` → `services/placement-service/src/companies/companies.controller.ts` · `update()`
- `social-service GET /` → `services/social-service/routes/web.php`
- `social-service GET /conversations/{id}/messages` → `services/social-service/routes/api.php`
- `social-service GET /posts` → `services/social-service/routes/api.php`
- `social-service GET /posts/{id}` → `services/social-service/routes/api.php`
- `social-service POST /conversations/{id}/messages` → `services/social-service/routes/api.php`
- `social-service POST /friend-request` → `services/social-service/routes/api.php`
- `social-service POST /posts` → `services/social-service/routes/api.php`
- `social-service PUT /friendships/{id}/accept` → `services/social-service/routes/api.php`
- `transport-service GET /` → `services/transport-service/main.py`
- `transport-service GET /health` → `services/transport-service/main.py`
- `user-service GET /users` → `services/user-service/src/users/users.controller.ts` · `findAll()`
- `user-service GET /users/me` → `services/user-service/src/users/users.controller.ts` · `getMe()`
- `user-service GET /v1/me` → `services/user-service/src/users/me.controller.ts` · `getMe()`
- `user-service GET /v1/me/attendance` → `services/user-service/src/users/me.controller.ts` · `getAttendance()`
- `user-service GET /v1/me/grades` → `services/user-service/src/users/me.controller.ts` · `getGrades()`
- `user-service GET /v1/me/profile` → `services/user-service/src/users/me.controller.ts` · `getProfile()`
- `user-service GET /v1/me/schedule` → `services/user-service/src/users/me.controller.ts` · `getSchedule()`
- `user-service PATCH /v1/me/profile` → `services/user-service/src/users/me.controller.ts` · `updateProfile()`
- `user-service POST /users/onboard` → `services/user-service/src/users/users.controller.ts` · `onboardUser()`

## 3) Documented BUT not implemented (API MISSING)

- `api-gateway GET /admin/settings` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /finance/invoices` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /students` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /users` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/academic-years` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/chats` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/courses` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/friends/requests` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/groups` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/notifications` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/posts` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway GET /v1/profiles/me` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway PATCH /v1/profiles/me` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /auth/login` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/academic-years` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/calls/rooms` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/courses` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/friends/requests` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/groups` → `services/api-gateway/openapi/combined.openapi.json`
- `api-gateway POST /v1/posts` → `services/api-gateway/openapi/combined.openapi.json`

## 4) Neither implemented nor documented (Roadmap/Social required gap)

- None
