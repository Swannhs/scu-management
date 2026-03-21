
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceStatusTrackingScreen extends StatelessWidget {

  const ServiceStatusTrackingScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Padding(

            padding: const EdgeInsets.all(24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildHeader(isDark),

                const SizedBox(height: 32),

                const Text(

                  'My Service Flow',

                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: -0.5),

                ),

                const SizedBox(height: 8),

                Text(

                  'Track your impact and manage current assignments.',

                  style: TextStyle(color: Colors.grey[500], fontSize: 14),

                ),

                const SizedBox(height: 32),

                _buildLiveTimerCard(isDark),

                const SizedBox(height: 40),

                _buildSectionHeader('Active Applications', 'VIEW ALL', isDark),

                const SizedBox(height: 16),

                _buildApplicationCard('After-School Math Tutor', 'Education Support', 'Westside Youth Center', 'PENDING', Colors.red[50]!, Colors.red[900]!, isDark),

                const SizedBox(height: 12),

                _buildApplicationCard('Riverside Cleanup Crew', 'Environmental', 'Starting Oct 12, 2023', 'APPROVED', Colors.green[50]!, AppTheme.primary, isDark),

                const SizedBox(height: 12),

                _buildApplicationCard('Senior Home Assistant', 'Healthcare', 'Queue Position: #4', 'WAITLISTED', Colors.grey[100]!, Colors.grey[600]!, isDark),

                const SizedBox(height: 40),

                const Text('Upcoming Sessions', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                const SizedBox(height: 16),

                _buildUpcomingSession('Tree Planting Day', 'OCT', '14', '09:00 AM - 01:00 PM', isDark),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Row(

          children: [

            Icon(Icons.menu, color: isDark ? Colors.white : Colors.black),

            const SizedBox(width: 16),

            const Text(

              'CampusServe',

              style: TextStyle(color: AppTheme.primary, fontSize: 18, fontWeight: FontWeight.bold),

            ),

          ],

        ),

        const CircleAvatar(

          radius: 18,

          backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user'),

        ),

      ],

    );

  }

  Widget _buildLiveTimerCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        color: AppTheme.primary,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [

          BoxShadow(

            color: AppTheme.primary.withOpacity(0.3),

            blurRadius: 20,

            offset: const Offset(0, 10),

          ),

        ],

      ),

      child: Column(

        children: [

          const Text(

            'LIVE PARTICIPATION',

            style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1),

          ),

          const SizedBox(height: 12),

          const Text(

            'Community Kitchen Helper',

            style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),

          ),

          const SizedBox(height: 24),

          Row(

            mainAxisAlignment: MainAxisAlignment.center,

            crossAxisAlignment: CrossAxisAlignment.baseline,

            textBaseline: TextBaseline.alphabetic,

            children: [

              const Text(

                '02:45',

                style: TextStyle(color: Colors.white, fontSize: 64, fontWeight: FontWeight.w900, fontFamily: 'Public Sans'),

              ),

              const SizedBox(width: 8),

              const Text(

                '32',

                style: TextStyle(color: Colors.white70, fontSize: 24, fontWeight: FontWeight.bold),

              ),

            ],

          ),

          const SizedBox(height: 32),

          Row(

            children: [

              Expanded(

                child: Container(

                  height: 54,

                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),

                  child: Row(

                    mainAxisAlignment: MainAxisAlignment.center,

                    children: const [

                      Icon(Icons.pause, color: AppTheme.primary, size: 20),

                      SizedBox(width: 8),

                      Text('Pause', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 16)),

                    ],

                  ),

                ),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Container(

                  height: 54,

                  decoration: BoxDecoration(color: Colors.red[100], borderRadius: BorderRadius.circular(20)),

                  child: Row(

                    mainAxisAlignment: MainAxisAlignment.center,

                    children: [

                      Icon(Icons.stop, color: Colors.red[900], size: 20),

                      const SizedBox(width: 8),

                      Text('Stop', style: TextStyle(color: Colors.red[900], fontWeight: FontWeight.bold, fontSize: 16)),

                    ],

                  ),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title, String link, bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        Text(link, style: const TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildApplicationCard(String title, String category, String sub, String status, Color statusBg, Color statusText, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Text(category, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(4)),

                child: Text(status, style: TextStyle(color: statusText, fontSize: 8, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

          const SizedBox(height: 4),

          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

          const SizedBox(height: 12),

          Row(

            children: [

              Icon(sub.contains('Oct') ? Icons.calendar_today : (sub.contains('Center') ? Icons.location_on : Icons.groups), size: 14, color: Colors.grey[400]),

              const SizedBox(width: 8),

              Text(sub, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildUpcomingSession(String title, String month, String day, String time, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

            decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(16)),

            child: Column(

              children: [

                Text(month, style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

                Text(day, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: AppTheme.primary, height: 1.1)),

              ],

            ),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

                const SizedBox(height: 4),

                Row(

                  children: [

                    Icon(Icons.access_time, size: 14, color: Colors.grey[400]),

                    const SizedBox(width: 6),

                    Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                  ],

                ),

              ],

            ),

          ),

          IconButton(icon: const Icon(Icons.arrow_forward, color: Colors.grey, size: 18), onPressed: () {}),

        ],

      ),

    );

  }

}
