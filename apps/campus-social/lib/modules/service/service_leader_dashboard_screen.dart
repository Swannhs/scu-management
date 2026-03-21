
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceLeaderDashboardScreen extends StatelessWidget {

  const ServiceLeaderDashboardScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(isDark),

            Expanded(

              child: SingleChildScrollView(

                child: Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 24.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildPageHeader(isDark),

                      const SizedBox(height: 24),

                      _buildQuickAction(isDark),

                      const SizedBox(height: 32),

                      _buildStatsGrid(isDark),

                      const SizedBox(height: 40),

                      _buildApplicationsSection(isDark),

                      const SizedBox(height: 40),

                      _buildRecentActivity(isDark),

                      const SizedBox(height: 32),

                      _buildSupportCard(isDark),

                      const SizedBox(height: 100),

                    ],

                  ),

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(24.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              Container(

                width: 40,

                height: 40,

                decoration: BoxDecoration(

                  color: AppTheme.primary.withOpacity(0.1),

                  shape: BoxShape.circle,

                ),

                child: Center(child: Icon(Icons.school, color: AppTheme.primary, size: 24)),

              ),

              const SizedBox(width: 12),

              const Text(

                'SCU Mobile',

                style: TextStyle(

                  color: AppTheme.primary,

                  fontFamily: 'Public Sans',

                  fontSize: 20,

                  fontWeight: FontWeight.w900,

                  letterSpacing: -0.5,

                ),

              ),

            ],

          ),

          IconButton(

            onPressed: () {},

            icon: const Icon(Icons.notifications_none, color: Colors.grey),

          ),

        ],

      ),

    );

  }

  Widget _buildPageHeader(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(

          'Organizer Flow'.toUpperCase(),

          style: const TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.5),

        ),

        const SizedBox(height: 4),

        const Text(

          'Service Dashboard',

          style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5),

        ),

      ],

    );

  }

  Widget _buildQuickAction(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.campaign, color: AppTheme.primary),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('QUICK ACTION', style: TextStyle(color: Colors.grey[400], fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

                const Text('Post Announcement', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

              ],

            ),

          ),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: AppTheme.primary,

              foregroundColor: Colors.white,

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),

            ),

            child: const Text('Broadcast', style: TextStyle(fontWeight: FontWeight.bold)),

          ),

        ],

      ),

    );

  }

  Widget _buildStatsGrid(bool isDark) {

    return GridView.count(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      crossAxisCount: 2,

      childAspectRatio: 1.2,

      mainAxisSpacing: 16,

      crossAxisSpacing: 16,

      children: [

        _buildStatCard('1,284', 'Total Applicants', Icons.group, AppTheme.primary, '+12%', isDark),

        _buildStatCard('3,450', 'Hours Verified', Icons.verified, Colors.orange, 'Goal: 5k', isDark),

        _buildStatCard('18', 'Active Opportunities', Icons.volunteer_activism, Colors.teal, null, isDark),

      ],

    );

  }

  Widget _buildStatCard(String value, String label, IconData icon, Color color, String? subValue, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Color(0xFF64748B).withOpacity(0.05)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 20,

            offset: const Offset(0, 8),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(

                padding: const EdgeInsets.all(8),

                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),

                child: Icon(icon, color: color, size: 20),

              ),

              if (subValue != null)

                Text(

                  subValue,

                  style: TextStyle(

                    color: subValue.startsWith('+') ? AppTheme.primary : Colors.grey[400],

                    fontSize: 10,

                    fontWeight: FontWeight.bold,

                  ),

                ),

            ],

          ),

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

              Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.bold)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildApplicationsSection(bool isDark) {

    return Column(

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Garden Cleanup Applications', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            TextButton.icon(

              onPressed: () {},

              icon: const Text('View all', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

              label: const Icon(Icons.arrow_forward, color: AppTheme.primary, size: 16),

            ),

          ],

        ),

        const SizedBox(height: 16),

        Container(

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(24),

            border: Border.all(color: Color(0xFF64748B).withOpacity(0.05)),

          ),

          child: Column(

            children: [

              _buildAppItem('Alex Morgan', 'Environmental Science', 'Pending', 'https://i.pravatar.cc/150?u=alex', isDark, isPending: true),

              _buildAppItem('Jamie Dawson', 'Computer Science', 'Reviewed', 'https://i.pravatar.cc/150?u=jamie', isDark),

              _buildAppItem('Sarah Lopez', 'Business Management', 'Pending', 'https://i.pravatar.cc/150?u=sarah', isDark, isPending: true),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildAppItem(String name, String major, String status, String avatar, bool isDark, {bool isPending = false}) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        border: Border(bottom: BorderSide(color: Color(0xFF64748B).withOpacity(0.05))),

      ),

      child: Row(

        children: [

          CircleAvatar(radius: 20, backgroundImage: NetworkImage(avatar)),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),

                Text(major, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(

              color: isPending ? Colors.red[50] : AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(20),

            ),

            child: Text(

              status.toUpperCase(),

              style: TextStyle(color: isPending ? Colors.red[900] : AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold),

            ),

          ),

          const SizedBox(width: 12),

          Row(

            children: [

              _ActionButton(Icons.check, AppTheme.primary),

              const SizedBox(width: 8),

              _ActionButton(Icons.close, Colors.red),

            ],

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

        _ActivityItem('New Opportunity Posted', 'Tutoring at local primary school. 2 hours ago.', AppTheme.primary),

        _ActivityItem('Hours Verified', '12 students verified for Food Bank Drive. 5 hours ago.', Colors.orange),

      ],

    );

  }

  Widget _buildActivityItem(String title, String subtitle, Color color) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 16.0),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(

            margin: const EdgeInsets.only(top: 6),

            width: 8,

            height: 8,

            decoration: BoxDecoration(color: color, shape: BoxShape.circle),

          ),

          const SizedBox(width: 16),

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

              Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSupportCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.05),

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Stack(

        children: [

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('Organizer Support', style: TextStyle(color: AppTheme.primary, fontSize: 20, fontWeight: FontWeight.bold)),

              const SizedBox(height: 8),

              Text(

                'Need help managing your service project? Access our coordinator toolkit or reach out to the Service Center.',

                style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.5),

              ),

              const SizedBox(height: 16),

              ElevatedButton(

                onPressed: () {},

                style: ElevatedButton.styleFrom(

                  backgroundColor: Colors.white,

                  foregroundColor: AppTheme.primary,

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                ),

                child: const Text('Get Resources', style: TextStyle(fontWeight: FontWeight.bold)),

              ),

            ],

          ),

          Positioned(

            bottom: -20,

            right: -20,

            child: Opacity(

              opacity: 0.1,

              child: Icon(Icons.support_agent, size: 100, color: AppTheme.primary),

            ),

          ),

        ],

      ),

    );

  }

}

class _ActionButton extends StatelessWidget {

  final IconData icon;

  final Color color;

  const _ActionButton(this.icon, this.color);

  @override

  Widget build(BuildContext context) {

    return Container(

      width: 32,

      height: 32,

      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),

      child: Center(child: Icon(icon, color: color, size: 18)),

    );

  }

}

class _ActivityItem extends StatelessWidget {

  final String title;

  final String subtitle;

  final Color color;

  const _ActivityItem(this.title, this.subtitle, this.color);

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 16.0),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(

            margin: const EdgeInsets.only(top: 6),

            width: 8,

            height: 8,

            decoration: BoxDecoration(color: color, shape: BoxShape.circle),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
