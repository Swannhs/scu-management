
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class AchievementsCertificatesScreen extends StatelessWidget {

  const AchievementsCertificatesScreen({super.key});

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

                  padding: const EdgeInsets.all(24.0),

                  child: Column(

                    children: [

                      _buildProfileSummary(isDark),

                      const SizedBox(height: 32),

                      _buildTabs(isDark),

                      const SizedBox(height: 32),

                      _buildBadgesGrid(isDark),

                      const SizedBox(height: 48),

                      _buildCertificatesHeader(isDark),

                      const SizedBox(height: 16),

                      _buildCertificatesList(isDark),

                      const SizedBox(height: 100),

                    ],

                  ),

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 4), // Profile index or custom

    );

  }

  Widget _buildHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

              const Text('Achievements', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

            ],

          ),

          IconButton(icon: const Icon(Icons.account_circle, color: Colors.grey), onPressed: () {}),

        ],

      ),

    );

  }

  Widget _buildProfileSummary(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.04),

            blurRadius: 32,

            offset: const Offset(0, 12),

          ),

        ],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(4),

            decoration: BoxDecoration(

              shape: BoxShape.circle,

              gradient: LinearGradient(colors: [AppTheme.primary, Color(0xFF00A76F)]),

            ),

            child: const CircleAvatar(

              radius: 36,

              backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=isabella'),

              backgroundColor: Colors.white,

            ),

          ),

          const SizedBox(width: 20),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Isabella Chen', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

                Text('Computer Science Graduate', style: TextStyle(color: Colors.grey[500], fontSize: 13, fontWeight: FontWeight.w500)),

                const SizedBox(height: 8),

                Row(

                  children: const [

                    Icon(Icons.military_tech, color: AppTheme.primary, size: 18),

                    SizedBox(width: 4),

                    Text('24 Achievements', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(4),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : Color(0xFFF1F5F9),

        borderRadius: BorderRadius.circular(16),

      ),

      child: Row(

        children: [

          Expanded(child: _buildTabItem('Digital Badges', true, isDark)),

          Expanded(child: _buildTabItem('Certificates', false, isDark)),

        ],

      ),

    );

  }

  Widget _buildTabItem(String label, bool isActive, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 12),

      decoration: BoxDecoration(

        color: isActive ? (isDark ? AppTheme.cardDark : Colors.white) : Colors.transparent,

        borderRadius: BorderRadius.circular(12),

        boxShadow: isActive ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2))] : null,

      ),

      child: Center(

        child: Text(

          label,

          style: TextStyle(

            color: isActive ? AppTheme.primary : Colors.grey[500],

            fontWeight: FontWeight.bold,

            fontSize: 13,

          ),

        ),

      ),

    );

  }

  Widget _buildBadgesGrid(bool isDark) {

    final badges = [

      {'label': "Dean's List", 'icon': Icons.stars, 'color': AppTheme.primary},

      {'label': 'Top 1% Rank', 'icon': Icons.rocket_launch, 'color': Colors.red},

      {'label': 'Research Asst.', 'icon': Icons.biotech, 'color': Colors.blue},

      {'label': 'Green Campus', 'icon': Icons.eco, 'color': Colors.green},

    ];

    return GridView.count(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      crossAxisCount: 2,

      mainAxisSpacing: 16,

      crossAxisSpacing: 16,

      childAspectRatio: 0.9,

      children: badges.map((badge) => _buildBadgeCard(badge['label'] as String, badge['icon'] as IconData, badge['color'] as Color, isDark)).toList(),

    );

  }

  Widget _buildBadgeCard(String label, IconData icon, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Stack(

            alignment: Alignment.bottomRight,

            children: [

              Container(

                width: 80,

                height: 80,

                decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),

                child: Icon(icon, color: color, size: 40),

              ),

              Container(

                padding: const EdgeInsets.all(2),

                decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle),

                child: const Icon(Icons.verified, color: AppTheme.primary, size: 20),

              ),

            ],

          ),

          const SizedBox(height: 16),

          Text(label, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, height: 1.2)),

          const SizedBox(height: 8),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

            child: const Text('VERIFIED', style: TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          ),

        ],

      ),

    );

  }

  Widget _buildCertificatesHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        const Text('Certificates', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

        const Text('View All', style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildCertificatesList(bool isDark) {

    final certs = [

      {'title': 'Advanced Algorithms', 'date': 'Jan 12, 2024'},

      {'title': 'Student Union Leadership', 'date': 'Nov 05, 2023'},

      {'title': 'Volunteer Ethics', 'date': 'Aug 24, 2023'},

    ];

    return Column(

      children: certs.map((cert) => _buildCertItem(cert['title']!, cert['date']!, isDark)).toList(),

    );

  }

  Widget _buildCertItem(String title, String date, bool isDark) {

    return Container(

      margin: const EdgeInsets.only(bottom: 12),

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 8,

            offset: const Offset(0, 2),

          ),

        ],

      ),

      child: Row(

        children: [

          Container(

            width: 48,

            height: 48,

            decoration: BoxDecoration(color: Color(0xFFF8FAFC), borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.picture_as_pdf, color: AppTheme.primary),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text('Earned $date', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              ],

            ),

          ),

          IconButton(

            icon: const Icon(Icons.download, color: Colors.grey, size: 20),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

}
