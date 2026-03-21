
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class TranscriptBadgesScreen extends StatelessWidget {

  const TranscriptBadgesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            Expanded(

              child: SingleChildScrollView(

                child: Column(

                  children: [

                    _buildUserProfile(isDark),

                    _buildTabs(isDark),

                    Padding(

                      padding: const EdgeInsets.all(24.0),

                      child: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          _buildDigitalBadges(isDark),

                          const SizedBox(height: 32),

                          _buildAcademicPerformance(isDark),

                          const SizedBox(height: 100),

                        ],

                      ),

                    ),

                  ],

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Academic index

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: const Icon(Icons.arrow_back),

            onPressed: () => Navigator.pop(context),

          ),

          const Text(

            'Academic Records',

            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

          ),

          IconButton(

            icon: const Icon(Icons.more_vert),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

  Widget _buildUserProfile(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 24.0),

      child: Column(

        children: [

          Stack(

            alignment: Alignment.bottomRight,

            children: [

              Container(

                padding: const EdgeInsets.all(4),

                decoration: BoxDecoration(

                  shape: BoxShape.circle,

                  border: Border.all(color: AppTheme.primary, width: 2),

                ),

                child: const CircleAvatar(

                  radius: 48,

                  backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex'),

                ),

              ),

              Container(

                padding: const EdgeInsets.all(4),

                decoration: BoxDecoration(

                  color: AppTheme.primary,

                  shape: BoxShape.circle,

                  border: Border.all(color: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight, width: 2),

                ),

                child: const Icon(Icons.verified, color: Colors.white, size: 14),

              ),

            ],

          ),

          const SizedBox(height: 16),

          const Text(

            'Alex Rivers',

            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),

          ),

          const Text(

            'B.Sc. Computer Science • Year 4',

            style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w500),

          ),

          const Text(

            'Student ID: #882910',

            style: TextStyle(color: Colors.grey, fontSize: 12),

          ),

        ],

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      decoration: BoxDecoration(

        border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

      ),

      child: Row(

        children: [

          _buildTabItem('Transcript', true, isDark),

          _buildTabItem('Certificates', false, isDark),

        ],

      ),

    );

  }

  Widget _buildTabItem(String label, bool isActive, bool isDark) {

    return Expanded(

      child: Container(

        padding: const EdgeInsets.symmetric(vertical: 12),

        decoration: BoxDecoration(

          border: Border(

            bottom: BorderSide(

              color: isActive ? AppTheme.primary : Colors.transparent,

              width: 3,

            ),

          ),

        ),

        child: Center(

          child: Text(

            label,

            style: TextStyle(

              color: isActive ? AppTheme.primary : Colors.grey,

              fontWeight: FontWeight.bold,

              fontSize: 14,

            ),

          ),

        ),

      ),

    );

  }

  Widget _buildDigitalBadges(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Digital Badges', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

              decoration: BoxDecoration(

                color: AppTheme.primary.withOpacity(0.1),

                borderRadius: BorderRadius.circular(20),

              ),

              child: const Text('3 Verified', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

        const SizedBox(height: 16),

        SingleChildScrollView(

          scrollDirection: Axis.horizontal,

          child: Row(

            children: [

              _buildBadgeCard("Dean's List", Icons.military_tech, Colors.amber, isDark),

              _buildBadgeCard("Honors", Icons.workspace_premium, Colors.blue, isDark),

              _buildBadgeCard("Top 1%", Icons.star, AppTheme.primary, isDark),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildBadgeCard(String label, IconData icon, Color color, bool isDark) {

    return Container(

      width: 110,

      margin: const EdgeInsets.only(right: 16),

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Column(

        children: [

          Container(

            padding: const EdgeInsets.all(8),

            decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),

            child: Icon(icon, color: color, size: 32),

          ),

          const SizedBox(height: 12),

          Text(

            label.toUpperCase(),

            textAlign: TextAlign.center,

            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5),

          ),

        ],

      ),

    );

  }

  Widget _buildAcademicPerformance(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Academic Performance', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        const SizedBox(height: 16),

        _buildPerformanceItem('Year 3 - Semester 2', 'GPA: 3.92 • 15 Credits', isDark),

        _buildPerformanceItem('Year 3 - Semester 1', 'GPA: 3.88 • 18 Credits', isDark),

        _buildPerformanceItem('Year 2 - Full Year', 'GPA: 3.75 • 32 Credits', isDark, opacity: 0.75),

        _buildPerformanceItem('Year 1 - Full Year', 'GPA: 3.60 • 30 Credits', isDark, opacity: 0.75),

      ],

    );

  }

  Widget _buildPerformanceItem(String title, String subtitle, bool isDark, {double opacity = 1.0}) {

    return Opacity(

      opacity: opacity,

      child: Container(

        margin: const EdgeInsets.only(bottom: 12),

        padding: const EdgeInsets.all(16),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark.withOpacity(0.4) : Colors.white,

          borderRadius: BorderRadius.circular(16),

          border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        ),

        child: Row(

          children: [

            Container(

              padding: const EdgeInsets.all(10),

              decoration: BoxDecoration(

                color: opacity < 1.0 ? Colors.grey.withOpacity(0.1) : AppTheme.primary.withOpacity(0.1),

                borderRadius: BorderRadius.circular(12),

              ),

              child: Icon(Icons.menu_book, color: opacity < 1.0 ? Colors.grey : AppTheme.primary, size: 24),

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

            IconButton(

              icon: const Icon(Icons.download, color: AppTheme.primary),

              onPressed: () {},

            ),

          ],

        ),

      ),

    );

  }

}
