
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class TeacherServiceDashboardScreen extends StatelessWidget {

  const TeacherServiceDashboardScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Padding(

            padding: const EdgeInsets.all(24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildHeader(isDark),

                const SizedBox(height: 32),

                _buildGreeting(),

                const SizedBox(height: 32),

                _buildActionButtons(context, isDark),

                const SizedBox(height: 40),

                _buildStatsGrid(isDark),

                const SizedBox(height: 40),

                _buildSubmissionsHeader(isDark),

                const SizedBox(height: 16),

                _buildSubmissionCard('Marcus Chen', 'Reflective essay: Weekly soup kitchen...', '4.5 Hours', 'PDF', 'https://i.pravatar.cc/150?u=marcus', isDark),

                const SizedBox(height: 16),

                _buildSubmissionCard('Elena Rodriguez', 'Environmental Cleanup Project - Beach...', '3.0 Hours', '1 Image', 'https://i.pravatar.cc/150?u=elena', isDark),

                const SizedBox(height: 40),

                _buildVerificationRequests(isDark),

                const SizedBox(height: 40),

                _buildRecentActivity(isDark),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        const Text(

          'EduServe',

          style: TextStyle(color: AppTheme.primary, fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1),

        ),

        Row(

          children: [

            IconButton(icon: const Icon(Icons.notifications_none, color: Colors.grey), onPressed: () {}),

            const CircleAvatar(radius: 18, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=sarah')),

          ],

        ),

      ],

    );

  }

  Widget _buildGreeting() {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Welcome back,\nSarah.',

          style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5, height: 1.1),

        ),

        const SizedBox(height: 12),

        RichText(

          text: TextSpan(

            style: const TextStyle(color: Colors.grey, fontSize: 15, height: 1.5),

            children: [

              const TextSpan(text: 'You have '),

              TextSpan(text: '12 pending applications', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

              const TextSpan(text: ' and '),

              const TextSpan(text: '4 verification requests', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black87)),

              const TextSpan(text: ' today.'),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Row(

      children: [

        Expanded(

          child: _ActionButton(Icons.campaign, 'Broadcast Announcement', Colors.grey[200]!, Colors.black87, isDark),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: GestureDetector(

            onTap: () => Navigator.pushNamed(context, '/create-opportunity-wizard'),

            child: _ActionButton(Icons.add_circle_outline, 'Create New Opportunity', AppTheme.primary, Colors.white, isDark),

          ),

        ),

      ],

    );

  }

  Widget _ActionButton(IconData icon, String label, Color bg, Color text, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Icon(icon, color: text, size: 20),

          const SizedBox(width: 8),

          Expanded(child: Text(label, style: TextStyle(color: text, fontWeight: FontWeight.bold, fontSize: 13), textAlign: TextAlign.center, maxLines: 2)),

        ],

      ),

    );

  }

  Widget _buildStatsGrid(bool isDark) {

    return Column(

      children: [

        _buildStatCard('24', 'Ongoing community initiatives', 'ACTIVE PROJECTS', Icons.rocket_launch, isDark),

        const SizedBox(height: 16),

        _buildStatCard('184', 'Active Students', null, Icons.person, isDark, isPrimary: true),

        const SizedBox(height: 16),

        _buildStatCard('1,420', 'Verified Hours', null, Icons.check_circle, isDark, isGrey: true),

      ],

    );

  }

  Widget _buildStatCard(String value, String label, String? badge, IconData icon, bool isDark, {bool isPrimary = false, bool isGrey = false}) {

    Color bg = isPrimary ? AppTheme.primary : (isGrey ? Colors.grey[100]! : Colors.white);

    Color contentColor = isPrimary ? Colors.white : Colors.black87;

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : bg,

        borderRadius: BorderRadius.circular(24),

        boxShadow: !isPrimary && !isGrey ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 8))] : null,

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              if (badge != null)

                Container(

                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                  decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

                  child: Text(badge, style: const TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 1)),

                ),

              Icon(icon, color: isPrimary ? Colors.white70 : AppTheme.primary),

            ],

          ),

          const SizedBox(height: 16),

          Text(value, style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900, color: contentColor, height: 1)),

          const SizedBox(height: 4),

          Text(label, style: TextStyle(color: isPrimary ? Colors.white70 : Colors.grey[500], fontSize: 14, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

  Widget _buildSubmissionsHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        const Text('Submissions for Review', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        Row(

          children: [

            Container(padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: Colors.orange[50], borderRadius: BorderRadius.circular(4)), child: Text('New', style: TextStyle(color: Colors.orange[900], fontSize: 10, fontWeight: FontWeight.bold))),

            const SizedBox(width: 12),

            TextButton(onPressed: () {}, child: const Text('View All', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.bold))),

          ],

        ),

      ],

    );

  }

  Widget _buildSubmissionCard(String name, String desc, String hours, String attachment, String avatar, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Row(

            children: [

              CircleAvatar(radius: 24, backgroundImage: NetworkImage(avatar)),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Row(

                      children: [

                        Text(name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

                        const SizedBox(width: 8),

                        const Icon(Icons.info_outline, size: 14, color: Colors.grey),

                      ],

                    ),

                    Text(desc, style: TextStyle(color: Colors.grey[500], fontSize: 12), maxLines: 1, overflow: TextOverflow.ellipsis),

                  ],

                ),

              ),

            ],

          ),

          const SizedBox(height: 16),

          Row(

            children: [

              _buildSmallBadge(Icons.timer, hours),

              const SizedBox(width: 12),

              _buildSmallBadge(Icons.attachment, attachment),

            ],

          ),

          const SizedBox(height: 20),

          Row(

            children: [

              Expanded(child: _buildIconButton(Icons.close, Colors.grey[100]!, Colors.black54)),

              const SizedBox(width: 12),

              Expanded(child: _buildIconButton(Icons.check, AppTheme.primary, Colors.white)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSmallBadge(IconData icon, String label) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

      decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(8)),

      child: Row(

        children: [

          Icon(icon, size: 12, color: Colors.grey[700]),

          const SizedBox(width: 6),

          Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),

        ],

      ),

    );

  }

  Widget _buildIconButton(IconData icon, Color bg, Color color) {

    return Container(

      height: 48,

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12)),

      child: Icon(icon, color: color),

    );

  }

  Widget _buildVerificationRequests(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Verification Requests', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        const SizedBox(height: 16),

        _buildRequestItem('Community Partner Approval', 'Action required: Student has submitted hours from an external partner.', Icons.description, isDark),

        const SizedBox(height: 12),

        _buildRequestItem('Late Hour Request', '2 students requested an extension for project logging.', Icons.calendar_today, isDark),

      ],

    );

  }

  Widget _buildRequestItem(String title, String sub, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(20)),

      child: Row(

        children: [

          Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)), child: Icon(icon, color: AppTheme.primary, size: 20)),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(sub, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                const SizedBox(height: 8),

                const Text('Review Details >', style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold)),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildRecentActivity(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Recent Activity', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        const SizedBox(height: 16),

        _ActivityLine('Broadcast sent: "New Volunteering Guidelines"', '2 HOURS AGO', isDark),

        _ActivityLine('Project "Urban Garden" updated', 'YESTERDAY', isDark),

      ],

    );

  }

  Widget _buildActivityLine(String label, String time, bool isDark) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 12.0),

      child: Row(

        children: [

          Container(width: 6, height: 6, decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle)),

          const SizedBox(width: 12),

          Expanded(child: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),

          Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

}

class _ActivityLine extends StatelessWidget {

  final String label;

  final String time;

  final bool isDark;

  const _ActivityLine(this.label, this.time, this.isDark);

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 12.0),

      child: Row(

        children: [

          Container(width: 6, height: 6, decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle)),

          const SizedBox(width: 12),

          Expanded(child: Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),

          Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

}
