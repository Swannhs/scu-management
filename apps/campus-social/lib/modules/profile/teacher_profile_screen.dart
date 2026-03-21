
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherProfileScreen extends StatelessWidget {

  const TeacherProfileScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Teacher Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.settings, color: Color(0xFF008D58)), onPressed: () {}),

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

              _buildHeader(isDark),

              const SizedBox(height: 32),

              _buildStudentsManagedCard(isDark),

              const SizedBox(height: 16),

              Row(

                children: [

                  Expanded(child: _buildSmallStatCard('ACTIVE PROJECTS', '12', Icons.rocket_launch, isDark)),

                  const SizedBox(width: 16),

                  Expanded(child: _buildSmallStatCard('REVIEWS DONE', '450', Icons.assignment_turned_in, isDark)),

                ],

              ),

              const SizedBox(height: 32),

              _buildBioSection(isDark),

              const SizedBox(height: 32),

              _buildMenuSection(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: _buildTeacherBottomNav(isDark),

    );

  }

  Widget _buildHeader(bool isDark) {

    return Row(

      children: [

        Stack(

          alignment: Alignment.bottomRight,

          children: [

            Container(

              decoration: BoxDecoration(

                borderRadius: BorderRadius.circular(20),

                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],

              ),

              child: ClipRRect(

                borderRadius: BorderRadius.circular(20),

                child: Image.network(r'https://i.pravatar.cc/150?u=sarah_jenkins', width: 80, height: 80, fit: BoxFit.cover),

              ),

            ),

            Container(

              padding: const EdgeInsets.all(4),

              decoration: BoxDecoration(color: const Color(0xFF007A5E), shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),

              child: const Icon(Icons.check, color: Colors.white, size: 12),

            ),

          ],

        ),

        const SizedBox(width: 20),

        Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('Prof. Sarah Jenkins', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

              const SizedBox(height: 4),

              const Text('Social Service Coordinator', style: TextStyle(color: Color(0xFF008D58), fontWeight: FontWeight.bold, fontSize: 13)),

              Text('Student Affairs Department', style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.w500)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildStudentsManagedCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: const Border(left: BorderSide(color: Color(0xFF007A5E), width: 6)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text('STUDENTS MANAGED', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

              const SizedBox(height: 8),

              const Text('1,200', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1)),

            ],

          ),

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: const Color(0xFFC0F2D8), borderRadius: BorderRadius.circular(16)),

            child: const Icon(Icons.people, color: Color(0xFF007A5E), size: 32),

          ),

        ],

      ),

    );

  }

  Widget _buildSmallStatCard(String label, String value, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(

            padding: const EdgeInsets.all(8),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

            child: Icon(icon, color: AppTheme.primary, size: 18),

          ),

          const SizedBox(height: 16),

          Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          const SizedBox(height: 4),

          Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

        ],

      ),

    );

  }

  Widget _buildBioSection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFF1F3F5).withOpacity(0.6),

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text('PROFESSIONAL BIO', style: TextStyle(color: Colors.grey[600], fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 12),

          Text(

            'Dedicated educator with 10+ years of experience in community outreach. Leading the Student Affairs social initiatives to bridge academic learning with real-world impact.',

            style: TextStyle(color: Colors.grey[700], fontSize: 13, height: 1.6),

          ),

        ],

      ),

    );

  }

  Widget _buildMenuSection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        children: [

          _buildMenuItem(Icons.dashboard_customize, 'Manage My Projects', isDark),

          const Divider(indent: 52),

          _buildMenuItem(Icons.assignment_ind, 'Review Queue', isDark, badgeText: '24 NEW'),

          const Divider(indent: 52),

          _buildMenuItem(Icons.campaign, 'Department Broadcast', isDark),

          const Divider(indent: 52),

          _buildMenuItem(Icons.file_download, 'Export Impact Reports', isDark, isLast: true),

        ],

      ),

    );

  }

  Widget _buildMenuItem(IconData icon, String title, bool isDark, {String? badgeText, bool isLast = false}) {

    return ListTile(

      leading: Container(

        padding: const EdgeInsets.all(8),

        decoration: BoxDecoration(color: const Color(0xFFE9FAEF), borderRadius: BorderRadius.circular(10)),

        child: Icon(icon, color: const Color(0xFF007A5E), size: 20),

      ),

      title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

      trailing: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          if (badgeText != null) ...[

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

              decoration: BoxDecoration(color: const Color(0xFFD32F2F), borderRadius: BorderRadius.circular(8)),

              child: Text(badgeText, style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),

            ),

            const SizedBox(width: 8),

          ],

          Icon(isLast ? Icons.download : Icons.chevron_right, size: 20, color: Colors.grey[400]),

        ],

      ),

      onTap: () {},

    );

  }

  Widget _buildTeacherBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        border: Border(top: BorderSide(color: Colors.grey[200]!)),

      ),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavItem(Icons.grid_view, 'DASHBOARD', false),

          _buildNavItem(Icons.volunteer_activism_outlined, 'OPPORTUNITIES', false),

          _buildNavItem(Icons.person, 'PROFILE', true),

        ],

      ),

    );

  }

}

class _buildNavItem extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isSelected;

  const _buildNavItem(this.icon, this.label, this.isSelected);

  @override

  Widget build(BuildContext context) {

    return Column(

      mainAxisSize: MainAxisSize.min,

      children: [

        Icon(icon, color: isSelected ? const Color(0xFF008D58) : Colors.grey[400], size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? const Color(0xFF008D58) : Colors.grey[600], fontSize: 9, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal, letterSpacing: 0.5)),

      ],

    );

  }

}
