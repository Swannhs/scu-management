
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SemesterDetailScreen extends StatelessWidget {

  const SemesterDetailScreen({super.key});

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

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    _buildSummaryStats(isDark),

                    _buildSectionHeader('Course Results', '6 Subjects', isDark),

                    _buildCourseList(isDark),

                    const SizedBox(height: 100),

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

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      decoration: BoxDecoration(

        border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: const Icon(Icons.arrow_back),

            onPressed: () => Navigator.pop(context),

          ),

          const Text(

            'Fall Semester 2023',

            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

          ),

          IconButton(

            icon: const Icon(Icons.share_outlined),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

  Widget _buildSummaryStats(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Row(

        children: [

          _buildStatBox('3.85', 'Term GPA', isDark, isPrimary: true),

          const SizedBox(width: 12),

          _buildStatBox('18', 'Credits Earned', isDark),

        ],

      ),

    );

  }

  Widget _buildStatBox(String value, String label, bool isDark, {bool isPrimary = false}) {

    return Expanded(

      child: Container(

        padding: const EdgeInsets.symmetric(vertical: 24),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(20),

          border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

          boxShadow: [

            BoxShadow(

              color: Colors.black.withOpacity(0.04),

              blurRadius: 10,

              offset: const Offset(0, 4),

            ),

          ],

        ),

        child: Column(

          children: [

            Text(

              value,

              style: TextStyle(

                color: isPrimary ? AppTheme.primary : (isDark ? Colors.white : Colors.black),

                fontSize: 32,

                fontWeight: FontWeight.bold,

              ),

            ),

            const SizedBox(height: 4),

            Text(

              label.toUpperCase(),

              style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildSectionHeader(String title, String subtitle, bool isDark) {

    return Padding(

      padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

          Text(subtitle, style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.w500)),

        ],

      ),

    );

  }

  Widget _buildCourseList(bool isDark) {

    final courses = [

      {'title': 'Computer Networks', 'credits': '4 Credits', 'grade': 'A', 'icon': Icons.lan},

      {'title': 'Database Systems', 'credits': '4 Credits', 'grade': 'A-', 'icon': Icons.storage},

      {'title': 'Software Engineering', 'credits': '3 Credits', 'grade': 'B+', 'icon': Icons.developer_mode},

      {'title': 'Discrete Mathematics', 'credits': '3 Credits', 'grade': 'A', 'icon': Icons.calculate},

      {'title': 'Intro to Psychology', 'credits': '2 Credits', 'grade': 'A-', 'icon': Icons.psychology},

      {'title': 'Technical Writing', 'credits': '2 Credits', 'grade': 'A', 'icon': Icons.translate},

    ];

    return ListView.builder(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      itemCount: courses.length,

      itemBuilder: (context, index) {

        final course = courses[index];

        return Container(

          margin: const EdgeInsets.only(bottom: 12),

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark.withOpacity(0.4) : Colors.white,

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

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

                decoration: BoxDecoration(

                  color: AppTheme.primary.withOpacity(0.1),

                  borderRadius: BorderRadius.circular(12),

                ),

                child: Icon(course['icon'] as IconData, color: AppTheme.primary),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(

                      course['title'] as String,

                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),

                    ),

                    const SizedBox(height: 4),

                    Row(

                      children: [

                        Text(course['credits'] as String, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                        const SizedBox(width: 8),

                        Container(width: 4, height: 4, decoration: BoxDecoration(color: Colors.grey[300], shape: BoxShape.circle)),

                        const SizedBox(width: 8),

                        const Text('View Feedback', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

                      ],

                    ),

                  ],

                ),

              ),

              Text(

                course['grade'] as String,

                style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 20),

              ),

            ],

          ),

        );

      },

    );

  }

}
