
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class AssignmentsGradingScreen extends StatelessWidget {

  const AssignmentsGradingScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(isDark),

            _buildTabs(isDark),

            Expanded(

              child: ListView(

                padding: const EdgeInsets.symmetric(horizontal: 16),

                children: [

                  const SizedBox(height: 24),

                  _buildSectionHeader('Due Soon', '3 Tasks', isDark),

                  const SizedBox(height: 12),

                  _buildAssignmentCard(

                    'Advanced Calculus - PS4',

                    'Pending',

                    'Today, 11:59 PM',

                    'Oct 24',

                    Icons.description,

                    Colors.amber,

                    isDark,

                  ),

                  const SizedBox(height: 12),

                  _buildAssignmentCard(

                    'Organic Chem Lab Report',

                    'Submitted',

                    'Oct 26, 5:00 PM',

                    'Oct 26',

                    Icons.biotech,

                    AppTheme.primary,

                    isDark,

                  ),

                  const SizedBox(height: 32),

                  _buildSectionHeader('Recent Grades', '', isDark),

                  const SizedBox(height: 16),

                  _buildGradeCard(

                    'Midterm Project: Modernism',

                    'Art History 101 • Prof. Aris',

                    '94%',

                    'Excellent analysis of cubist influences. Your visual presentation was particularly strong. Minor formatting issues in the citations.',

                    AppTheme.primary,

                    isDark,

                  ),

                  const SizedBox(height: 16),

                  _buildGradeCard(

                    'Statistical Models Quiz',

                    'Mathematics • Dr. Chen',

                    '82%',

                    'Good understanding of hypothesis testing. Watch your rounding in the final calculation of question 4.',

                    isDark ? Colors.white : Colors.black87,

                    isDark,

                  ),

                  const SizedBox(height: 100),

                ],

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

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

              IconButton(icon: const Icon(Icons.arrow_back), onPressed: () {}),

              const SizedBox(width: 8),

              const Text('Assignments', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

            ],

          ),

          IconButton(icon: const Icon(Icons.notifications), onPressed: () {}),

        ],

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1)))),

      child: Row(

        children: [

          _buildTab('Upcoming', true),

          const SizedBox(width: 32),

          _buildTab('Graded', false),

        ],

      ),

    );

  }

  Widget _buildTab(String label, bool active) {

    return Container(

      padding: const EdgeInsets.only(bottom: 12, top: 12),

      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: active ? AppTheme.primary : Colors.transparent, width: 2))),

      child: Text(label, style: TextStyle(color: active ? AppTheme.primary : Colors.grey, fontWeight: FontWeight.bold, fontSize: 14)),

    );

  }

  Widget _buildSectionHeader(String title, String count, bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        if (count.isNotEmpty)

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

            child: Text(count, style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

          ),

      ],

    );

  }

  Widget _buildAssignmentCard(String title, String status, String time, String date, IconData icon, Color statusColor, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

            child: Icon(icon, color: AppTheme.primary, size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                const SizedBox(height: 4),

                Row(

                  children: [

                    Container(width: 6, height: 6, decoration: BoxDecoration(color: statusColor, shape: BoxShape.circle)),

                    const SizedBox(width: 6),

                    Text(status, style: TextStyle(color: statusColor, fontSize: 12, fontWeight: FontWeight.w500)),

                    const SizedBox(width: 12),

                    const Icon(Icons.schedule, size: 14, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                  ],

                ),

              ],

            ),

          ),

          Text(date, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

        ],

      ),

    );

  }

  Widget _buildGradeCard(String title, String course, String grade, String feedback, Color gradeColor, bool isDark) {

    bool isPrimary = gradeColor == AppTheme.primary;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isPrimary ? AppTheme.primary.withOpacity(0.05) : (isDark ? Colors.white.withOpacity(0.03) : Colors.grey[100]),

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: isPrimary ? AppTheme.primary.withOpacity(0.1) : (isDark ? Colors.white10 : Colors.black.withOpacity(0.05))),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    Text(course, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                  ],

                ),

              ),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),

                decoration: BoxDecoration(color: gradeColor, borderRadius: BorderRadius.circular(12)),

                child: Text(grade, style: TextStyle(color: isPrimary ? Colors.white : (isDark ? Colors.black : Colors.white), fontSize: 18, fontWeight: FontWeight.w900)),

              ),

            ],

          ),

          const SizedBox(height: 16),

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(

              color: isDark ? Colors.black.withOpacity(0.2) : Colors.white.withOpacity(0.8),

              borderRadius: BorderRadius.circular(12),

            ),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('PROFESSOR FEEDBACK', style: TextStyle(color: isPrimary ? AppTheme.primary : Colors.grey, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

                const SizedBox(height: 4),

                Text(

                  '"$feedback"',

                  style: TextStyle(color: isDark ? Colors.white70 : Colors.black87, fontSize: 13, fontStyle: FontStyle.italic, height: 1.5),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
