
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class StudentProfileScreen extends StatelessWidget {

  const StudentProfileScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Student Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.settings), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            const SizedBox(height: 24),

            _buildProfileHeader(isDark),

            const SizedBox(height: 32),

            _buildStatSummary(isDark),

            const SizedBox(height: 40),

            _buildAchievementsSection(isDark),

            const SizedBox(height: 40),

            _buildProfileMenu(isDark),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Profile index

    );

  }

  Widget _buildProfileHeader(bool isDark) {

    return Column(

      children: [

        Stack(

          alignment: Alignment.bottomRight,

          children: [

            Container(

              padding: const EdgeInsets.all(4),

              decoration: BoxDecoration(

                shape: BoxShape.circle,

                border: Border.all(color: const Color(0xFF00A870), width: 4),

              ),

              child: const CircleAvatar(

                radius: 60,

                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_johnson_v2'),

              ),

            ),

            Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(

                color: Color(0xFF007A5E),

                shape: BoxShape.circle,

              ),

              child: const Icon(Icons.check, color: Colors.white, size: 20),

            ),

          ],

        ),

        const SizedBox(height: 20),

        const Text('Alex Johnson', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        const SizedBox(height: 8),

        const Text('ENVIRONMENTAL SCIENCE', style: TextStyle(color: Color(0xFF008D58), fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(height: 4),

        Text('ID: ST-2024-8842', style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildStatSummary(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 20.0),

      child: Row(

        children: [

          Expanded(child: _buildStatCard('Total Hours', '45.5h', false, isDark)),

          const SizedBox(width: 12),

          Expanded(child: _buildStatCard('Active', '2', true, isDark)),

          const SizedBox(width: 12),

          Expanded(child: _buildStatCard('Completed', '8', false, isDark)),

        ],

      ),

    );

  }

  Widget _buildStatCard(String label, String value, bool isHighlighted, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: isHighlighted ? Border(top: BorderSide(color: AppTheme.primary, width: 3)) : null,

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

          const SizedBox(height: 8),

          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

        ],

      ),

    );

  }

  Widget _buildAchievementsSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('Achievements', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

              TextButton(onPressed: () {}, child: const Text('View All', style: TextStyle(color: Color(0xFF008D58), fontWeight: FontWeight.bold, fontSize: 12))),

            ],

          ),

        ),

        const SizedBox(height: 16),

        SingleChildScrollView(

          scrollDirection: Axis.horizontal,

          padding: const EdgeInsets.symmetric(horizontal: 24),

          child: Row(

            children: [

              _buildAchievementItem('Green Leader', Icons.eco, const Color(0xFF6CF0A9), isDark),

              const SizedBox(width: 20),

              _buildAchievementItem('Top Volunteer', Icons.favorite, const Color(0xFFC0F2D8), isDark),

              const SizedBox(width: 20),

              _buildAchievementItem('20h Milestone', Icons.military_tech, const Color(0xFFE9ECEF), isDark),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildAchievementItem(String label, IconData icon, Color bg, bool isDark) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.all(20),

          decoration: BoxDecoration(color: bg, shape: BoxShape.circle),

          child: Icon(icon, color: isDark ? Colors.black87 : const Color(0xFF007A5E), size: 28),

        ),

        const SizedBox(height: 12),

        Text(label, style: TextStyle(color: Colors.grey[700], fontSize: 10, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildProfileMenu(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 20.0),

      child: Container(

        padding: const EdgeInsets.all(12),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(24),

        ),

        child: Column(

          children: [

            _buildMenuItem(Icons.history, 'Full Service History', isDark),

            const Divider(indent: 52),

            _buildMenuItem(Icons.workspace_premium, 'My Certificates', isDark),

            const Divider(indent: 52),

            _buildMenuItem(Icons.analytics, 'Impact Report', isDark, hasBadge: true),

          ],

        ),

      ),

    );

  }

  Widget _buildMenuItem(IconData icon, String title, bool isDark, {bool hasBadge = false}) {

    return ListTile(

      leading: Container(

        padding: const EdgeInsets.all(8),

        decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(10)),

        child: Icon(icon, color: Colors.grey[700], size: 20),

      ),

      title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

      trailing: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          if (hasBadge) ...[

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

              decoration: BoxDecoration(color: const Color(0xFF00A870), borderRadius: BorderRadius.circular(8)),

              child: const Text('NEW', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),

            ),

            const SizedBox(width: 12),

          ],

          const Icon(Icons.chevron_right, size: 16, color: Colors.grey),

        ],

      ),

      onTap: () {},

    );

  }

}
