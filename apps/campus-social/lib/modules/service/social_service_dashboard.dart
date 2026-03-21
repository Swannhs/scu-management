
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SocialServiceDashboard extends StatelessWidget {

  const SocialServiceDashboard({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: Row(

          children: [

            const CircleAvatar(radius: 20, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex')),

            const SizedBox(width: 12),

            Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('Good morning, Alex', style: TextStyle(color: isDark ? Colors.grey[400] : Colors.grey[600], fontSize: 12)),

                const Text('Dashboard', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              ],

            ),

          ],

        ),

        actions: [

          IconButton(icon: Icon(Icons.notifications_none, color: isDark ? Colors.white : Colors.black), onPressed: () => Navigator.pushNamed(context, '/service-notifications')),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildStatsCard(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('Quick Actions', null),

              const SizedBox(height: 16),

              _buildQuickActions(context, isDark),

              const SizedBox(height: 32),

              _buildActiveServiceBanner(context, isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('Applications', 'View All'),

              const SizedBox(height: 16),

              InkWell(

                onTap: () => Navigator.pushNamed(context, '/my-applications'),

                child: _buildApplicationItem('Community Garden', 'Downtown District • 3 miles away', 'Pending', Colors.red[50]!, Colors.red, isDark),

              ),

              const SizedBox(height: 12),

              InkWell(

                onTap: () => Navigator.pushNamed(context, '/my-applications'),

                child: _buildApplicationItem('Elderly Care', 'Sunrise Residence • 5 miles away', 'Waitlisted', Colors.grey[100]!, Colors.grey[600]!, isDark),

              ),

              const SizedBox(height: 32),

              _buildSectionHeader('Recent Activity', null),

              const SizedBox(height: 16),

              InkWell(

                onTap: () => Navigator.pushNamed(context, '/submission-status'),

                child: _buildActivityItem('Your hours for Library Assistant have been verified.', '2 hours ago', '+4.5 hrs', AppTheme.primary, isDark),

              ),

              const SizedBox(height: 16),

              InkWell(

                onTap: () => Navigator.pushNamed(context, '/my-applications'),

                child: _buildActivityItem('Application approved: Youth Soccer Mentor.', 'Yesterday', null, null, isDark, isApproved: true),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () => Navigator.pushNamed(context, '/opportunity-discovery'),

        backgroundColor: AppTheme.primary,

        child: const Icon(Icons.add, color: Colors.white),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildSectionHeader(String title, String? action) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        if (action != null)

          TextButton(

            onPressed: () {},

            child: Text(action, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

          ),

      ],

    );

  }

  Widget _buildStatsCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 10))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Text('Total Hours Completed', style: TextStyle(color: Colors.grey[500], fontSize: 13, fontWeight: FontWeight.bold)),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(8)),

                child: const Text('TOP 10%', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

          const SizedBox(height: 16),

          const Text('32.5', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: AppTheme.primary, fontFamily: 'Public Sans')),

          const SizedBox(height: 24),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Text('Progress to Graduation', style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.bold)),

              const Text('65%', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

            ],

          ),

          const SizedBox(height: 12),

          ClipRRect(

            borderRadius: BorderRadius.circular(4),

            child: LinearProgressIndicator(value: 0.65, backgroundColor: Colors.grey[200], valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.primary), minHeight: 8),

          ),

          const SizedBox(height: 12),

          Text('17.5 hours remaining of your 50 hour goal', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontStyle: FontStyle.italic)),

        ],

      ),

    );

  }

  Widget _buildQuickActions(BuildContext context, bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        _buildQuickActionItem(context, 'Discover', Icons.search, Colors.green[50]!, AppTheme.primary, '/opportunity-discovery', isDark),

        _buildQuickActionItem(context, 'Check-in', Icons.location_on, Colors.blue[50]!, Colors.blue, '/session-check-in', isDark),

        _buildQuickActionItem(context, 'Submit Proof', Icons.description, Colors.red[50]!, Colors.red, '/submit-service-proof', isDark),

        _buildQuickActionItem(context, 'My History', Icons.history, Colors.orange[50]!, Colors.orange, '/service-history', isDark),

      ],

    );

  }

  Widget _buildQuickActionItem(BuildContext context, String label, IconData icon, Color bg, Color fg, String route, bool isDark) {

    return InkWell(

      onTap: () => Navigator.pushNamed(context, route),

      child: Column(

        children: [

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),

            child: Icon(icon, color: fg),

          ),

          const SizedBox(height: 8),

          Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isDark ? Colors.grey[400] : Colors.grey[700])),

        ],

      ),

    );

  }

  Widget _buildActiveServiceBanner(BuildContext context, bool isDark) {

    return InkWell(

      onTap: () => Navigator.pushNamed(context, '/active-services'),

      child: Container(

        padding: const EdgeInsets.all(24),

        decoration: BoxDecoration(

          gradient: const LinearGradient(colors: [AppTheme.primary, Color(0xFF00C853)]),

          borderRadius: BorderRadius.circular(24),

          boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],

        ),

        child: Row(

          children: [

            Container(

              padding: const EdgeInsets.all(12),

              decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(16)),

              child: const Icon(Icons.nature_people, color: Colors.white),

            ),

            const SizedBox(width: 16),

            Expanded(

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('ACTIVE SERVICE', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                  const SizedBox(height: 4),

                  const Text('Environmental Cleanup', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),

                  const SizedBox(height: 4),

                  Text('Tomorrow, 10:00 AM', style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 12)),

                ],

              ),

            ),

            const Icon(Icons.arrow_forward_ios, color: Colors.white, size: 16),

          ],

        ),

      ),

    );

  }

  Widget _buildApplicationItem(String title, String subtitle, String status, Color statusBg, Color statusFg, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.park, color: Colors.grey),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(8)),

            child: Text(status, style: TextStyle(color: statusFg, fontSize: 10, fontWeight: FontWeight.bold)),

          ),

        ],

      ),

    );

  }

  Widget _buildActivityItem(String text, String time, String? hours, Color? hoursColor, bool isDark, {bool isApproved = false}) {

    return Row(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Container(

          margin: const EdgeInsets.only(top: 6),

          width: 8,

          height: 8,

          decoration: BoxDecoration(color: isApproved ? Colors.green : AppTheme.primary, shape: BoxShape.circle),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  Expanded(child: Text(text, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),

                  if (hours != null) Text(hours, style: TextStyle(color: hoursColor, fontWeight: FontWeight.bold, fontSize: 12)),

                  if (isApproved) const Icon(Icons.check_circle, color: Colors.grey, size: 12),

                ],

              ),

              const SizedBox(height: 4),

              Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 11)),

            ],

          ),

        ),

      ],

    );

  }

}
