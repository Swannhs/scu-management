
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceLiveTrackingScreen extends StatelessWidget {

  const ServiceLiveTrackingScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FB),

      appBar: AppBar(

        backgroundColor: Colors.transparent,

        elevation: 0,

        leading: const Icon(Icons.menu),

        title: const Text('Student Service', style: TextStyle(fontWeight: FontWeight.w900, fontFamily: 'Public Sans', fontSize: 20)),

        centerTitle: false,

        actions: const [Icon(Icons.search), SizedBox(width: 16)],

      ),

      body: SingleChildScrollView(

        padding: const EdgeInsets.all(24.0),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            _buildLiveSessionCard(isDark),

            const SizedBox(height: 40),

            _buildSectionTitle('My Applications', 'View All'),

            _buildApplicationCard('Library Catalog Assistant', 'Applied 2 days ago', 'Pending', Colors.orange, isDark),

            const SizedBox(height: 12),

            _buildApplicationCard('Urban Garden Project', 'Approved yesterday', 'Approved', AppTheme.primary, isDark),

            const SizedBox(height: 40),

            _buildSectionTitle('Upcoming Sessions', null),

            SizedBox(

              height: 160,

              child: ListView(

                scrollDirection: Axis.horizontal,

                children: [

                  _buildSessionCard('Morning Beach Cleanup', 'OCT 24', '08:00 AM - 11:00 AM', isDark),

                  const SizedBox(width: 16),

                  _buildSessionCard('Youth Mentorship Circle', 'OCT 26', '04:00 PM - 06:00 PM', isDark),

                ],

              ),

            ),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildLiveSessionCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 32, offset: const Offset(0, 12))],

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('Active Participation', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 13)),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

                child: const Text('LIVE SESSION', style: TextStyle(color: AppTheme.primary, fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 1.0)),

              ),

            ],

          ),

          const SizedBox(height: 8),

          const Text('Community Kitchen Helper', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

          const SizedBox(height: 32),

          Container(

            width: double.infinity,

            padding: const EdgeInsets.symmetric(vertical: 24),

            decoration: BoxDecoration(color: isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6), borderRadius: BorderRadius.circular(16)),

            child: Column(

              children: [

                const Text('02:45:32', style: TextStyle(fontSize: 48, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1.0)),

                const SizedBox(height: 8),

                const Text('ONGOING TASK', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11, letterSpacing: 1.2)),

              ],

            ),

          ),

          const SizedBox(height: 24),

          Row(

            children: [

              Expanded(

                child: ElevatedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.pause, size: 20),

                  label: const Text('Pause', style: TextStyle(fontWeight: FontWeight.bold)),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: isDark ? Color(0xFF1E293B) : const Color(0xFFECEEF0),

                    foregroundColor: isDark ? Colors.white : Color(0xFF0F172A),

                    minimumSize: const Size(0, 56),

                    shape: const StadiumBorder(),

                    elevation: 0,

                  ),

                ),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Container(

                  decoration: BoxDecoration(

                    gradient: const LinearGradient(colors: [Color(0xFF006C46), Color(0xFF00A76F)]),

                    borderRadius: BorderRadius.circular(16),

                    boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))],

                  ),

                  child: ElevatedButton.icon(

                    onPressed: () {},

                    icon: const Icon(Icons.stop, size: 20),

                    label: const Text('Stop', style: TextStyle(fontWeight: FontWeight.bold)),

                    style: ElevatedButton.styleFrom(

                      backgroundColor: Colors.transparent,

                      foregroundColor: Colors.white,

                      minimumSize: const Size(0, 56),

                      shape: const StadiumBorder(),

                      elevation: 0,

                    ),

                  ),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSectionTitle(String title, String? action) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 20),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          if (action != null) Text(action, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13)),

        ],

      ),

    );

  }

  Widget _buildApplicationCard(String title, String subtitle, String status, Color statusColor, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(color: isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6), borderRadius: BorderRadius.circular(12)),

            child: Icon(Icons.description, color: statusColor, size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: statusColor.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

            child: Text(status.toUpperCase(), style: TextStyle(color: statusColor, fontSize: 9, fontWeight: FontWeight.w900)),

          ),

        ],

      ),

    );

  }

  Widget _buildSessionCard(String title, String date, String time, bool isDark) {

    return Container(

      width: 280,

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

                child: Text(date, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w900, fontSize: 11)),

              ),

              const Icon(Icons.more_horiz, color: Colors.grey),

            ],

          ),

          const Spacer(),

          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          const SizedBox(height: 8),

          Row(

            children: [

              const Icon(Icons.schedule, size: 14, color: Colors.grey),

              const SizedBox(width: 6),

              Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.w500)),

            ],

          ),

        ],

      ),

    );

  }

}
