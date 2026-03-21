
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class TeacherHomeDashboard extends StatelessWidget {

  const TeacherHomeDashboard({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: Row(

          children: [

            Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(color: Color(0xFF007A5E), shape: BoxShape.circle),

              child: const Icon(Icons.hub, color: Colors.white, size: 20),

            ),

            const SizedBox(width: 12),

            const Text('ServiceHub', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

          ],

        ),

        actions: [

          IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const SizedBox(height: 24),

              const Text('Good morning, Coordinator Sarah', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, fontFamily: 'Public Sans', height: 1.2)),

              const SizedBox(height: 8),

              Text('Welcome back to your dashboard.', style: TextStyle(color: Colors.grey[500], fontSize: 14)),

              const SizedBox(height: 32),

              Row(

                children: [

                  Expanded(child: _buildStatCard('12', 'PENDING\nAPPLICATIONS', true, isDark)),

                  const SizedBox(width: 16),

                  Expanded(child: _buildStatCard('8', 'PENDING\nSUBMISSIONS', true, isDark)),

                ],

              ),

              const SizedBox(height: 32),

              _buildSectionHeader('QUICK ACTIONS'),

              const SizedBox(height: 16),

              SingleChildScrollView(

                scrollDirection: Axis.horizontal,

                child: Row(

                  children: [

                    _buildQuickActionCard('Create Opportunity', Icons.add_circle, AppTheme.primary, Colors.white),

                    const SizedBox(width: 12),

                    _buildQuickActionCard('Broadcast Message', Icons.campaign, Colors.grey[200]!, Colors.black87),

                    const SizedBox(width: 12),

                    _buildQuickActionCard('Generate Report', Icons.bar_chart, Colors.grey[200]!, Colors.black87),

                  ],

                ),

              ),

              const SizedBox(height: 32),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  _buildSectionHeader('ACTIVE OPPORTUNITIES'),

                  TextButton(onPressed: () {}, child: const Text('View All', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12))),

                ],

              ),

              const SizedBox(height: 8),

              _buildOpportunityItem('City Park Restoration', '24 active volunteers', Icons.park, isDark),

              const SizedBox(height: 12),

              _buildOpportunityItem('Math Tutoring', '15 active volunteers', Icons.functions, isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('RECENT ACTIVITY'),

              const SizedBox(height: 16),

              _buildActivityFeed(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: _buildTeacherBottomNav(isDark),

    );

  }

  Widget _buildStatCard(String value, String label, bool actionRequired, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text(value, style: TextStyle(color: AppTheme.primary, fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

          const SizedBox(height: 8),

          Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          if (actionRequired) ...[

            const SizedBox(height: 12),

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

              decoration: BoxDecoration(color: Colors.red[50], borderRadius: BorderRadius.circular(8)),

              child: const Text('Action Required', style: TextStyle(color: Colors.red, fontSize: 9, fontWeight: FontWeight.bold)),

            ),

          ],

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title) {

    return Text(title, style: TextStyle(color: Colors.grey[600], fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1));

  }

  Widget _buildQuickActionCard(String title, IconData icon, Color bg, Color fg) {

    return Container(

      width: 140,

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.center,

        children: [

          Icon(icon, color: fg, size: 24),

          const SizedBox(height: 12),

          Text(title, style: TextStyle(color: fg, fontSize: 13, fontWeight: FontWeight.bold), textAlign: TextAlign.center),

        ],

      ),

    );

  }

  Widget _buildOpportunityItem(String title, String subtitle, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

            child: Icon(icon, color: AppTheme.primary, size: 20),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                const SizedBox(height: 2),

                Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: const Color(0xFFF1F8F6),

              foregroundColor: const Color(0xFF007A5E),

              elevation: 0,

              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

            ),

            child: const Text('Manage', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

          ),

        ],

      ),

    );

  }

  Widget _buildActivityFeed(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

      ),

      child: Column(

        children: [

          _buildActivityItem('Alex J. submitted proof for Park Cleanup', '2 mins ago', isDark),

          const Divider(height: 24),

          _buildActivityItem('New application from Maria L. for Math Tutoring', '1 hour ago', isDark),

        ],

      ),

    );

  }

  Widget _buildActivityItem(String text, String time, bool isDark) {

    return Row(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Container(

          margin: const EdgeInsets.only(top: 6),

          width: 8,

          height: 8,

          decoration: BoxDecoration(color: Color(0xFF007A5E), shape: BoxShape.circle),

        ),

        const SizedBox(width: 12),

        Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(text, style: const TextStyle(fontSize: 13, height: 1.4)),

              const SizedBox(height: 4),

              Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildTeacherBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -4))],

      ),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavItem(Icons.grid_view_rounded, 'Dashboard', true),

          _buildNavItem(Icons.volunteer_activism, 'Projects', false),

          _buildNavItem(Icons.rate_review, 'Reviews', false),

          _buildNavItem(Icons.person_outline, 'Profile', false),

        ],

      ),

    );

  }

  Widget _buildNavItem(IconData icon, String label, bool isSelected) {

    return Column(

      mainAxisSize: MainAxisSize.min,

      children: [

        Icon(icon, color: isSelected ? AppTheme.primary : Colors.grey, size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? AppTheme.primary : Colors.grey, fontSize: 10, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),

      ],

    );

  }

}
