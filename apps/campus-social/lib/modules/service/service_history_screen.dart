
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceHistoryScreen extends StatelessWidget {

  const ServiceHistoryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Service History', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF008D58))),

        leading: IconButton(icon: const Icon(Icons.arrow_back, color: Color(0xFF008D58)), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.search, color: Color(0xFF008D58)), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            Padding(

              padding: const EdgeInsets.all(20.0),

              child: _buildTotalImpactCard(isDark),

            ),

            const SizedBox(height: 8),

            _buildFilterChips(isDark),

            const SizedBox(height: 24),

            ListView(

              shrinkWrap: true,

              physics: const NeverScrollableScrollPhysics(),

              padding: const EdgeInsets.symmetric(horizontal: 20),

              children: [

                _buildHistoryCard(

                  'City Park Restoration',

                  'Oct 12, 2023 • Environmental',

                  'VERIFIED',

                  '4h 00m',

                  Icons.park,

                  const Color(0xFFC0F2D8),

                  const Color(0xFF007A5E),

                  isDark,

                ),

                const SizedBox(height: 16),

                _buildHistoryCard(

                  'Community Soup Kitchen',

                  'Sep 28, 2023 • Social Service',

                  'COMPLETED',

                  '3h 30m',

                  Icons.soup_kitchen,

                  const Color(0xFFFFE3E3),

                  const Color(0xFFD32F2F),

                  isDark,

                  badgeBg: const Color(0xFFFFE3E3),

                  badgeFg: const Color(0xFFD32F2F),

                ),

                const SizedBox(height: 16),

                _buildHistoryCard(

                  'Math Tutoring Program',

                  'Aug 15, 2023 • Education',

                  'REJECTED',

                  '5h 00m',

                  Icons.school,

                  const Color(0xFFE9ECEF),

                  Colors.grey,

                  isDark,

                  badgeBg: const Color(0xFFFFE3E3),

                  badgeFg: const Color(0xFFD32F2F),

                  rejectionReason: 'Reason: Incomplete reflection document. Please re-submit with the signed supervisor form.',

                ),

                const SizedBox(height: 100),

              ],

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 1), // History index

    );

  }

  Widget _buildTotalImpactCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        gradient: const LinearGradient(

          colors: [Color(0xFF008D58), Color(0xFF00A870)],

          begin: Alignment.topLeft,

          end: Alignment.bottomRight,

        ),

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('TOTAL VERIFIED IMPACT', style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 8),

          Row(

            crossAxisAlignment: CrossAxisAlignment.baseline,

            textBaseline: TextBaseline.alphabetic,

            children: [

              Text('45.5', style: TextStyle(color: Colors.white, fontSize: 48, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

              SizedBox(width: 8),

              Text('hrs', style: TextStyle(color: Colors.white70, fontSize: 24, fontWeight: FontWeight.bold)),

            ],

          ),

          const SizedBox(height: 20),

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(16)),

            child: Row(

              children: [

                Container(

                  padding: const EdgeInsets.all(8),

                  decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),

                  child: const Icon(Icons.auto_awesome, color: Colors.white, size: 20),

                ),

                const SizedBox(width: 12),

                const Expanded(

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('Community Impact Score', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),

                      Text('Top 5% of student volunteers this semester.', style: TextStyle(color: Colors.white70, fontSize: 10)),

                    ],

                  ),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildFilterChips(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      padding: const EdgeInsets.symmetric(horizontal: 20),

      child: Row(

        children: [

          _buildChip('All', true, isDark),

          _buildChip('Verified', false, isDark),

          _buildChip('Completed', false, isDark),

          _buildChip('Rejected', false, isDark),

        ],

      ),

    );

  }

  Widget _buildChip(String label, bool isSelected, bool isDark) {

    return Container(

      margin: const EdgeInsets.only(right: 12),

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),

      decoration: BoxDecoration(

        color: isSelected ? const Color(0xFF00A870) : (isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF)),

        borderRadius: BorderRadius.circular(12),

      ),

      child: Text(

        label,

        style: TextStyle(

          color: isSelected ? Colors.white : (isDark ? Colors.white70 : Colors.grey[700]),

          fontWeight: FontWeight.bold,

          fontSize: 14,

        ),

      ),

    );

  }

  Widget _buildHistoryCard(

    String title,

    String subtitle,

    String status,

    String hours,

    IconData icon,

    Color iconBg,

    Color iconFg,

    bool isDark, {

    Color? badgeBg,

    Color? badgeFg,

    String? rejectionReason,

  }) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Row(

            children: [

              Container(

                padding: const EdgeInsets.all(12),

                decoration: BoxDecoration(color: iconBg, borderRadius: BorderRadius.circular(12)),

                child: Icon(icon, color: iconFg, size: 24),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                    const SizedBox(height: 4),

                    Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                  ],

                ),

              ),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

                decoration: BoxDecoration(

                  color: badgeBg ?? const Color(0xFFE9FAEF),

                  borderRadius: BorderRadius.circular(8),

                ),

                child: Text(

                  status,

                  style: TextStyle(color: badgeFg ?? const Color(0xFF007A5E), fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5),

                ),

              ),

            ],

          ),

          if (rejectionReason != null) ...[

            const SizedBox(height: 16),

            Container(

              padding: const EdgeInsets.all(12),

              decoration: BoxDecoration(

                color: const Color(0xFFFFF5F5),

                borderRadius: BorderRadius.circular(12),

                border: const Border(left: BorderSide(color: Color(0xFFD32F2F), width: 4)),

              ),

              child: Text(

                rejectionReason,

                style: const TextStyle(color: Color(0xFFD32F2F), fontSize: 11, height: 1.4),

              ),

            ),

          ],

          const SizedBox(height: 16),

          const Divider(),

          const SizedBox(height: 12),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Row(

                children: [

                  Icon(Icons.access_time_filled, color: status == 'REJECTED' ? Colors.red : const Color(0xFF007A5E), size: 16),

                  const SizedBox(width: 8),

                  Text(hours, style: TextStyle(color: status == 'REJECTED' ? Colors.red : Colors.black, fontWeight: FontWeight.bold, fontSize: 13)),

                ],

              ),

              TextButton(

                onPressed: () {},

                child: Row(

                  children: [

                    Text(status == 'REJECTED' ? 'Archive' : 'View Details', style: TextStyle(color: status == 'REJECTED' ? Colors.grey : AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),

                    if (status != 'REJECTED') ...[

                      const SizedBox(width: 4),

                      const Icon(Icons.chevron_right, color: AppTheme.primary, size: 16),

                    ],

                  ],

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

}
