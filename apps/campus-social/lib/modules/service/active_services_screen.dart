
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ActiveServicesScreen extends StatelessWidget {

  const ActiveServicesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Active Services', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        actions: [

          IconButton(

            icon: const CircleAvatar(

              radius: 16,

              backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex'),

            ),

            onPressed: () {},

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildImpactScoreCard(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('Ongoing Enrollment', '2 PROJECTS'),

              const SizedBox(height: 16),

              _buildProjectCard(

                context,

                title: 'City Park Restoration',

                org: 'GreenEarth Org',

                status: 'ACTIVE',

                statusBg: Colors.green[50]!,

                statusFg: AppTheme.primary,

                nextSession: 'Tomorrow, 09:00 AM',

                progress: 0.4,

                progressText: '4 / 10 hrs',

                nextStep: 'Next Step: Arrive at Central Park North Entrance',

                actionLabel: 'Check-in',

                actionIcon: Icons.location_on,

                isDark: isDark,

              ),

              const SizedBox(height: 24),

              _buildProjectCard(

                context,

                title: 'Community Kitchen Support',

                org: 'Campus Care Hub',

                status: 'ACTION REQUIRED',

                statusBg: Colors.red[50]!,

                statusFg: Colors.red,

                isAlert: true,

                alertText: 'Verify Attendance',

                progress: 0.66,

                progressText: '8 / 12 hrs',

                progressColor: Colors.red,

                actionLabel: 'Submit Proof',

                actionIcon: Icons.description,

                isDark: isDark,

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildImpactScoreCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        gradient: const LinearGradient(colors: [AppTheme.primary, Color(0xFF00C853)]),

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: const [

              Text('IMPACT SCORE', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),

              SizedBox(height: 12),

              Text('24.5h', style: TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

            ],

          ),

          Icon(Icons.volunteer_activism, color: Colors.white.withValues(alpha: 0.8), size: 48),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title, String? count) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        if (count != null) Text(count, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

      ],

    );

  }

  Widget _buildProjectCard(

    BuildContext context, {

    required String title,

    required String org,

    required String status,

    required Color statusBg,

    required Color statusFg,

    String? nextSession,

    required double progress,

    required String progressText,

    Color progressColor = AppTheme.primary,

    String? nextStep,

    bool isAlert = false,

    String? alertText,

    required String actionLabel,

    required IconData actionIcon,

    required bool isDark,

  }) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

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

                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                  const SizedBox(height: 4),

                  Row(

                    children: [

                      const Icon(Icons.nature_people, size: 14, color: Colors.grey),

                      const SizedBox(width: 8),

                      Text(org, style: TextStyle(color: Colors.grey[400], fontSize: 13)),

                    ],

                  ),

                ],

              ),

              Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(10)), child: Text(status, style: TextStyle(color: statusFg, fontSize: 10, fontWeight: FontWeight.bold))),

            ],

          ),

          const SizedBox(height: 24),

          if (nextSession != null)

            Container(

              padding: const EdgeInsets.all(16),

              decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(16)),

              child: Row(

                children: [

                  const Icon(Icons.calendar_today, size: 16, color: Colors.blueGrey),

                  const SizedBox(width: 12),

                  Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('NEXT SESSION', style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold)),

                      const SizedBox(height: 4),

                      Text(nextSession, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                    ],

                  ),

                ],

              ),

            ),

          if (isAlert)

            Container(

              padding: const EdgeInsets.all(16),

              decoration: BoxDecoration(color: Colors.red[50], borderRadius: BorderRadius.circular(16)),

              child: Row(

                children: [

                  const Icon(Icons.warning_amber_rounded, size: 20, color: Colors.red),

                  const SizedBox(width: 12),

                  Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('MISSING INFO', style: TextStyle(color: Colors.red[200], fontSize: 9, fontWeight: FontWeight.bold)),

                      const SizedBox(height: 4),

                      Text(alertText!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.red)),

                    ],

                  ),

                ],

              ),

            ),

          const SizedBox(height: 24),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('Hours Completed', style: TextStyle(color: Colors.grey, fontSize: 12)),

              Text(progressText, style: TextStyle(color: progressColor, fontWeight: FontWeight.bold, fontSize: 12)),

            ],

          ),

          const SizedBox(height: 12),

          ClipRRect(borderRadius: BorderRadius.circular(4), child: LinearProgressIndicator(value: progress, backgroundColor: Colors.grey[200], valueColor: AlwaysStoppedAnimation<Color>(progressColor), minHeight: 6)),

          const SizedBox(height: 24),

          if (nextStep != null)

            Container(

              padding: const EdgeInsets.all(16),

              decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(16), border: const Border(left: BorderSide(color: AppTheme.primary, width: 4))),

              child: Row(

                children: [

                  const Icon(Icons.info, size: 14, color: AppTheme.primary),

                  const SizedBox(width: 12),

                  Expanded(child: Text(nextStep, style: const TextStyle(fontSize: 12, color: Colors.black87))),

                ],

              ),

            ),

          const SizedBox(height: 24),

          ElevatedButton(

            onPressed: () {

              if (actionLabel == 'Check-in') {

                Navigator.pushNamed(context, '/session-check-in');

              } else {

                Navigator.pushNamed(context, '/submit-service-proof');

              }

            },

            style: ElevatedButton.styleFrom(

              backgroundColor: actionLabel == 'Check-in' ? AppTheme.primary : Colors.white,

              foregroundColor: actionLabel == 'Check-in' ? Colors.white : Colors.black87,

              minimumSize: const Size(double.infinity, 56),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: actionLabel == 'Check-in' ? BorderSide.none : BorderSide(color: Colors.grey[200]!)),

              elevation: 0,

            ),

            child: Row(

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                Icon(actionIcon, size: 18),

                const SizedBox(width: 12),

                Text(actionLabel, style: const TextStyle(fontWeight: FontWeight.bold)),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
