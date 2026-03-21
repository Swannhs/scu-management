
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class AchievementsScreen extends StatelessWidget {

  const AchievementsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Achievements', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          Padding(

            padding: const EdgeInsets.only(right: 16.0),

            child: CircleAvatar(

              radius: 18,

              backgroundImage: const NetworkImage('https://i.pravatar.cc/150?u=alex'),

            ),

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            const SizedBox(height: 24),

            _buildProfileSection(isDark),

            const SizedBox(height: 32),

            Padding(

              padding: const EdgeInsets.symmetric(horizontal: 24.0),

              child: _buildMilestoneCard(isDark),

            ),

            const SizedBox(height: 40),

            _buildSectionHeader('Earned Badges', 'View All', isDark),

            const SizedBox(height: 16),

            _buildBadgesGrid(isDark),

            const SizedBox(height: 40),

            _buildSectionHeader('Certificates', null, isDark),

            const SizedBox(height: 16),

            _buildCertificatesList(isDark),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Impact/Awards index

    );

  }

  Widget _buildProfileSection(bool isDark) {

    return Column(

      children: [

        Stack(

          alignment: Alignment.bottomRight,

          children: [

            Container(

              padding: const EdgeInsets.all(4),

              decoration: BoxDecoration(

                shape: BoxShape.circle,

                border: Border.all(color: AppTheme.primary, width: 3),

              ),

              child: const CircleAvatar(

                radius: 50,

                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_johnson'),

              ),

            ),

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

              decoration: BoxDecoration(

                color: const Color(0xFF007A5E),

                borderRadius: BorderRadius.circular(12),

                border: Border.all(color: Colors.white, width: 2),

              ),

              child: const Text('PRO', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

        const SizedBox(height: 16),

        const Text('Alex Johnson', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

        const SizedBox(height: 8),

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),

          decoration: BoxDecoration(

            color: AppTheme.primary.withOpacity(0.1),

            borderRadius: BorderRadius.circular(20),

          ),

          child: Row(

            mainAxisSize: MainAxisSize.min,

            children: [

              Icon(Icons.stars, color: AppTheme.primary, size: 16),

              SizedBox(width: 8),

              Text('Top 5% of Volunteers', style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildMilestoneCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 8))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('CURRENT MILESTONE', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                  const SizedBox(height: 4),

                  const Text('Master Volunteer', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                ],

              ),

              const Text('85%', style: TextStyle(color: AppTheme.primary, fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

            ],

          ),

          const SizedBox(height: 20),

          ClipRRect(

            borderRadius: BorderRadius.circular(10),

            child: const LinearProgressIndicator(

              value: 0.85,

              backgroundColor: Color(0xFFE9ECEF),

              valueColor: AlwaysStoppedAnimation<Color>(AppTheme.primary),

              minHeight: 12,

            ),

          ),

          const SizedBox(height: 16),

          Text(

            "You're only 15 hours away from your next tier. Keep up the great impact!",

            style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.5),

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title, String? action, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          if (action != null)

            TextButton(

              onPressed: () {},

              child: Text(action, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

            ),

        ],

      ),

    );

  }

  Widget _buildBadgesGrid(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: GridView.count(

        shrinkWrap: true,

        physics: const NeverScrollableScrollPhysics(),

        crossAxisCount: 2,

        mainAxisSpacing: 16,

        crossAxisSpacing: 16,

        childAspectRatio: 0.85,

        children: [

          _buildBadgeItem('Green Leader', 'Earned Oct 12, 2023', Icons.eco, isDark),

          _buildBadgeItem('Community Hero', 'Earned Sep 05, 2023', Icons.favorite, isDark),

          _buildBadgeItem('Eco Warrior', 'Earned Aug 22, 2023', Icons.bolt, isDark),

          _buildBadgeItem('Social Bond', 'Earned Jul 18, 2023', Icons.groups, isDark),

        ],

      ),

    );

  }

  Widget _buildBadgeItem(String title, String date, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

            child: Icon(icon, color: AppTheme.primary, size: 28),

          ),

          const SizedBox(height: 16),

          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14), textAlign: TextAlign.center),

          const SizedBox(height: 4),

          Text(date, style: TextStyle(color: Colors.grey[500], fontSize: 10), textAlign: TextAlign.center),

        ],

      ),

    );

  }

  Widget _buildCertificatesList(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Column(

        children: [

          _buildCertItem('Environmental Stewardship', 'SCU Sustainability Dept.', isDark),

          const SizedBox(height: 12),

          _buildCertItem('Community Leadership 101', 'Red Cross Partner', isDark),

          const SizedBox(height: 12),

          _buildCertItem('Youth Mentorship Program', 'SCU Outreach', isDark),

        ],

      ),

    );

  }

  Widget _buildCertItem(String title, String org, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.description, color: Colors.grey),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                const SizedBox(height: 2),

                Text(org, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.all(8),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), shape: BoxShape.circle),

            child: const Icon(Icons.download, color: AppTheme.primary, size: 20),

          ),

        ],

      ),

    );

  }

}
