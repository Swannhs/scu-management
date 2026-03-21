
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class OpportunityDetailScreen extends StatelessWidget {

  const OpportunityDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: Stack(

        children: [

          SingleChildScrollView(

            child: Column(

              children: [

                _buildHeroSection(context, isDark),

                const SizedBox(height: 24),

                Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 24.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildQuickActions(context, isDark),

                      const SizedBox(height: 32),

                      _buildDescription(isDark),

                      const SizedBox(height: 32),

                      _buildLocationSection(isDark),

                      const SizedBox(height: 120),

                    ],

                  ),

                ),

              ],

            ),

          ),

          _buildAppBar(context, isDark),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildAppBar(BuildContext context, bool isDark) {

    return Positioned(

      top: 0,

      left: 0,

      right: 0,

      child: Container(

        height: 100,

        padding: const EdgeInsets.fromLTRB(16, 40, 16, 0),

        decoration: BoxDecoration(

          gradient: LinearGradient(

            begin: Alignment.topCenter,

            end: Alignment.bottomCenter,

            colors: [

              Colors.black.withOpacity(0.4),

              Colors.transparent,

            ],

          ),

        ),

        child: Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            IconButton(

              icon: const Icon(Icons.arrow_back, color: Colors.white),

              onPressed: () => Navigator.pop(context),

            ),

            IconButton(

              icon: const Icon(Icons.notifications_outlined, color: Colors.white),

              onPressed: () {},

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildHeroSection(BuildContext context, bool isDark) {

    return Container(

      height: 300,

      width: double.infinity,

      decoration: BoxDecoration(

        image: DecorationImage(

          image: NetworkImage('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'),

          fit: BoxFit.cover,

        ),

      ),

      child: Container(

        decoration: BoxDecoration(

          gradient: LinearGradient(

            begin: Alignment.topCenter,

            end: Alignment.bottomCenter,

            colors: [

              Colors.transparent,

              Colors.black.withOpacity(0.7),

            ],

          ),

        ),

        padding: const EdgeInsets.all(24),

        child: Column(

          mainAxisAlignment: MainAxisAlignment.end,

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Row(

              children: [

                _buildBadge('Open - 5 spots left', AppTheme.primary),

                const SizedBox(width: 8),

                _buildBadge('4 Hours Offered', Colors.white.withOpacity(0.2)),

              ],

            ),

            const SizedBox(height: 12),

            const Text(

              'Campus Garden Cleanup',

              style: TextStyle(

                color: Colors.white,

                fontSize: 32,

                fontWeight: FontWeight.w900,

                fontFamily: 'Public Sans',

                height: 1.1,

              ),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildBadge(String text, Color color) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

      decoration: BoxDecoration(

        color: color,

        borderRadius: BorderRadius.circular(20),

      ),

      child: Text(

        text.toUpperCase(),

        style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5),

      ),

    );

  }

  Widget _buildQuickActions(BuildContext context, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

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

          const CircleAvatar(

            radius: 20,

            backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=sarah'),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('Organized by', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                const Text('Dr. Sarah Jenkins', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

              ],

            ),

          ),

          ElevatedButton(

            onPressed: () => Navigator.pushNamed(context, '/apply-service'),

            style: ElevatedButton.styleFrom(

              backgroundColor: AppTheme.primary,

              foregroundColor: Colors.white,

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),

            ),

            child: const Text('Apply Now', style: TextStyle(fontWeight: FontWeight.bold)),

          ),

        ],

      ),

    );

  }

  Widget _buildDescription(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Description', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

        const SizedBox(height: 12),

        Text(

          "Join us for our weekly sustainability drive! We'll be weeding, composting, and preparing seasonal beds for the upcoming spring planting. This is a great way to earn service hours while contributing to our campus food security initiative.",

          style: TextStyle(color: Colors.grey[600], fontSize: 14, height: 1.6),

        ),

        const SizedBox(height: 24),

        Container(

          padding: const EdgeInsets.all(20),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark.withOpacity(0.5) : Color(0xFFF8FAFC),

            borderRadius: BorderRadius.circular(16),

          ),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Row(

                children: [

                  Icon(Icons.checklist, color: AppTheme.primary, size: 18),

                  SizedBox(width: 8),

                  Text('Requirements', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                ],

              ),

              const SizedBox(height: 16),

              _buildRequirementItem('Bring personal gardening gloves'),

              _buildRequirementItem('Must be a Junior or Senior student'),

              _buildRequirementItem('Completed Safety Orientation (Level 1)'),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildRequirementItem(String text) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 8.0),

      child: Row(

        children: [

          Container(width: 6, height: 6, decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle)),

          const SizedBox(width: 12),

          Text(text, style: const TextStyle(fontSize: 12, color: Colors.grey)),

        ],

      ),

    );

  }

  Widget _buildLocationSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Location', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

        const SizedBox(height: 16),

        ClipRRect(

          borderRadius: BorderRadius.circular(20),

          child: Container(

            height: 180,

            width: double.infinity,

            decoration: BoxDecoration(

              image: DecorationImage(

                image: NetworkImage('https://images.unsplash.com/photo-1526772662000-3f88f10c05fe?w=800'),

                fit: BoxFit.cover,

              ),

            ),

            child: Center(

              child: Container(

                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

                decoration: BoxDecoration(

                  color: Colors.white.withOpacity(0.9),

                  borderRadius: BorderRadius.circular(30),

                ),

                child: Row(

                  mainAxisSize: MainAxisSize.min,

                  children: [

                    Icon(Icons.location_on, color: AppTheme.primary, size: 18),

                    SizedBox(width: 8),

                    Text('North Campus Sector 4', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.black)),

                  ],

                ),

              ),

            ),

          ),

        ),

        const SizedBox(height: 16),

        Row(

          children: [

            Expanded(child: _buildInfoItem(Icons.calendar_today, 'Date', 'Oct 24, 2023', Colors.red, isDark)),

            const SizedBox(width: 12),

            Expanded(child: _buildInfoItem(Icons.schedule, 'Time', '09:00 - 13:00', AppTheme.primary, isDark)),

          ],

        ),

      ],

    );

  }

  Widget _buildInfoItem(IconData icon, String label, String value, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Color(0xFF64748B).withOpacity(0.05)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Icon(icon, color: color, size: 20),

          const SizedBox(height: 8),

          Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

          const SizedBox(height: 4),

          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

        ],

      ),

    );

  }

}
