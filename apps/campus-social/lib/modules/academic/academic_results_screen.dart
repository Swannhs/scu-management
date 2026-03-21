
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class AcademicResultsScreen extends StatelessWidget {

  const AcademicResultsScreen({super.key});

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

                child: Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildSummaryCards(isDark),

                      const SizedBox(height: 32),

                      _buildSemesterOverview(context, isDark),

                      const SizedBox(height: 100),

                    ],

                  ),

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

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: const Icon(Icons.arrow_back),

            onPressed: () => Navigator.pop(context),

          ),

          const Text(

            'Academic Results',

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

  Widget _buildSummaryCards(bool isDark) {

    return Row(

      children: [

        Expanded(

          child: _buildStatsCard(

            'Cumulative GPA',

            '3.8',

            '+0.2%',

            Icons.grade,

            isDark,

          ),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: _buildProgressCard(

            'Total Credits',

            '96',

            '120',

            0.8,

            Icons.school,

            isDark,

          ),

        ),

      ],

    );

  }

  Widget _buildStatsCard(String label, String value, String change, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.04),

            blurRadius: 20,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Icon(icon, color: AppTheme.primary, size: 24),

          const SizedBox(height: 12),

          Text(

            label.toUpperCase(),

            style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),

          ),

          const SizedBox(height: 4),

          Row(

            crossAxisAlignment: CrossAxisAlignment.baseline,

            textBaseline: TextBaseline.alphabetic,

            children: [

              Text(

                value,

                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),

              ),

              const SizedBox(width: 4),

              Text(

                change,

                style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildProgressCard(String label, String current, String total, double progress, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.04),

            blurRadius: 20,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Icon(icon, color: AppTheme.primary, size: 24),

          const SizedBox(height: 12),

          Text(

            label.toUpperCase(),

            style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),

          ),

          const SizedBox(height: 4),

          RichText(

            text: TextSpan(

              style: TextStyle(color: isDark ? Colors.white : Colors.black, fontSize: 28, fontWeight: FontWeight.bold),

              children: [

                TextSpan(text: current),

                TextSpan(text: '/$total', style: TextStyle(color: Colors.grey[400], fontSize: 16)),

              ],

            ),

          ),

          const SizedBox(height: 12),

          ClipRRect(

            borderRadius: BorderRadius.circular(4),

            child: LinearProgressIndicator(

              value: progress,

              backgroundColor: isDark ? Color(0xFF334155) : Color(0xFFF1F5F9),

              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.primary),

              minHeight: 6,

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildSemesterOverview(BuildContext context, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text(

              'Semester Overview',

              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

            ),

            TextButton(

              onPressed: () {},

              child: const Text('Filter', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

        const SizedBox(height: 16),

        _buildSemesterCard(

          context,

          'Spring 2024',

          'GPA: 3.9 • 5 Subjects',

          Icons.calendar_today,

          AppTheme.primary,

          'Deans List Candidate',

          'https://images.unsplash.com/photo-1523240715632-d984bc310b1a?w=800',

          isDark,

          isCurrent: true,

        ),

        const SizedBox(height: 16),

        _buildSemesterCard(

          context,

          'Fall 2023',

          'GPA: 3.7 • 6 Subjects',

          Icons.history,

          Colors.grey,

          null,

          null,

          isDark,

        ),

        const SizedBox(height: 16),

        _buildSemesterCard(

          context,

          'Spring 2023',

          'GPA: 3.8 • 5 Subjects',

          Icons.history,

          Colors.grey,

          null,

          null,

          isDark,

          opacity: 0.8,

        ),

      ],

    );

  }

  Widget _buildSemesterCard(

    BuildContext context,

    String title,

    String subtitle,

    IconData icon,

    Color iconColor,

    String? badge,

    String? imageUrl,

    bool isDark, {

    bool isCurrent = false,

    double opacity = 1.0,

  }) {

    return Opacity(

      opacity: opacity,

      child: GestureDetector(

        onTap: () => Navigator.pushNamed(context, '/semester-detail'),

        child: Container(

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(20),

            border: Border.all(color: Color(0xFF64748B).withOpacity(0.05)),

            boxShadow: [

              BoxShadow(

                color: Colors.black.withOpacity(0.02),

                blurRadius: 10,

                offset: const Offset(0, 4),

              ),

            ],

          ),

          child: Column(

            children: [

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  Row(

                    children: [

                      Container(

                        width: 48,

                        height: 48,

                        decoration: BoxDecoration(

                          color: iconColor.withOpacity(0.1),

                          borderRadius: BorderRadius.circular(12),

                        ),

                        child: Icon(icon, color: iconColor),

                      ),

                      const SizedBox(width: 16),

                      Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                          Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                  Container(

                    padding: const EdgeInsets.all(8),

                    decoration: BoxDecoration(

                      color: isDark ? Color(0xFF334155) : Color(0xFFF8FAFC),

                      shape: BoxShape.circle,

                    ),

                    child: const Icon(Icons.keyboard_arrow_down, size: 20, color: Colors.grey),

                  ),

                ],

              ),

              if (imageUrl != null) ...[

                const SizedBox(height: 16),

                ClipRRect(

                  borderRadius: BorderRadius.circular(12),

                  child: Stack(

                    children: [

                      Image.network(

                        imageUrl,

                        height: 120,

                        width: double.infinity,

                        fit: BoxFit.cover,

                      ),

                      if (badge != null)

                        Positioned(

                          bottom: 12,

                          left: 12,

                          child: Container(

                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                            decoration: BoxDecoration(

                              color: Colors.black.withOpacity(0.6),

                              borderRadius: BorderRadius.circular(8),

                            ),

                            child: Text(

                              badge,

                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),

                            ),

                          ),

                        ),

                    ],

                  ),

                ),

              ],

            ],

          ),

        ),

      ),

    );

  }

}
