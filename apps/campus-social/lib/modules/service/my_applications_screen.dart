
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class MyApplicationsScreen extends StatelessWidget {

  const MyApplicationsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('My Applications', style: TextStyle(fontWeight: FontWeight.bold)),

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

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildFilterChips(isDark),

              const SizedBox(height: 32),

              _buildApplicationCard(

                'City Park Restoration',

                'GreenEarth Org',

                'Applied on Oct 24, 2023',

                'PENDING',

                Colors.red[50]!,

                Colors.red,

                'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=200',

                isDark,

              ),

              const SizedBox(height: 24),

              _buildApplicationCard(

                'Urban Garden Initiative',

                'City Roots Collective',

                'Applied on Oct 18, 2023',

                'APPROVED',

                Colors.green[50]!,

                AppTheme.primary,

                'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200',

                isDark,

              ),

              const SizedBox(height: 24),

              _buildApplicationCard(

                'Ocean Plastic Cleanup',

                'Marine Watch',

                'Applied on Sep 12, 2023',

                'COMPLETED',

                Colors.grey[100]!,

                Colors.grey[600]!,

                'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=200',

                isDark,

              ),

              const SizedBox(height: 48),

              _buildHelpCard(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildFilterChips(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      child: Row(

        children: [

          _buildFilterChip('All', true, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Pending', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Approved', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Completed', false, isDark),

        ],

      ),

    );

  }

  Widget _buildFilterChip(String label, bool isSelected, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),

      decoration: BoxDecoration(

        color: isSelected ? AppTheme.primary : (isDark ? AppTheme.cardDark : Colors.grey[100]),

        borderRadius: BorderRadius.circular(16),

      ),

      child: Text(

        label,

        style: TextStyle(

          color: isSelected ? Colors.white : (isDark ? Colors.grey : Colors.grey[600]),

          fontWeight: FontWeight.bold,

          fontSize: 14,

        ),

      ),

    );

  }

  Widget _buildApplicationCard(

    String title,

    String org,

    String date,

    String status,

    Color statusBg,

    Color statusFg,

    String imageUrl,

    bool isDark,

  ) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          ClipRRect(

            borderRadius: BorderRadius.circular(16),

            child: Image.network(imageUrl, width: 80, height: 80, fit: BoxFit.cover),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                      decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(10)),

                      child: Text(status, style: TextStyle(color: statusFg, fontSize: 10, fontWeight: FontWeight.bold)),

                    ),

                  ],

                ),

                const SizedBox(height: 12),

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                const SizedBox(height: 4),

                Text(org, style: TextStyle(color: Colors.grey[400], fontSize: 13)),

                const SizedBox(height: 12),

                Row(

                  children: [

                    const Icon(Icons.calendar_today, size: 10, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text(date, style: TextStyle(color: Colors.grey[400], fontSize: 11)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildHelpCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        gradient: const LinearGradient(colors: [AppTheme.primary, Color(0xFF00C853)]),

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('Need Help with Applications?', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

          const SizedBox(height: 12),

          Text(

            'Connect with an advisor to boost your chances of approval.',

            style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 14, height: 1.5),

          ),

          const SizedBox(height: 24),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: Colors.white,

              foregroundColor: AppTheme.primary,

              minimumSize: const Size(140, 48),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

              elevation: 0,

            ),

            child: const Text('Get Support', style: TextStyle(fontWeight: FontWeight.bold)),

          ),

        ],

      ),

    );

  }

}
