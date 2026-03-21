
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class OpportunityDiscoveryScreen extends StatelessWidget {

  const OpportunityDiscoveryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Discover', style: TextStyle(fontWeight: FontWeight.bold)),

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

        child: Column(

          children: [

            _buildSearchSection(isDark),

            _buildFilterChips(isDark),

            const SizedBox(height: 24),

            _buildDiscoveryList(context, isDark),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 0), // Explore is usually the first tab in this app's nav

    );

  }

  Widget _buildSearchSection(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(24.0),

      child: Container(

        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.grey[100],

          borderRadius: BorderRadius.circular(20),

        ),

        child: Row(

          children: [

            Icon(Icons.search, color: Colors.grey[500]),

            const SizedBox(width: 12),

            Expanded(

              child: TextField(

                decoration: InputDecoration(

                  hintText: 'Find specific opportunities...',

                  hintStyle: TextStyle(color: Colors.grey[500]),

                  border: InputBorder.none,

                ),

              ),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildFilterChips(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      padding: const EdgeInsets.symmetric(horizontal: 24),

      child: Row(

        children: [

          _buildFilterChip('All', true, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Environment', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Education', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Social Welfare', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('More', false, isDark),

        ],

      ),

    );

  }

  Widget _buildFilterChip(String label, bool isSelected, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),

      decoration: BoxDecoration(

        color: isSelected ? AppTheme.primary : (isDark ? AppTheme.cardDark : Colors.white),

        borderRadius: BorderRadius.circular(16),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2))],

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

  Widget _buildDiscoveryList(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Column(

        children: [

          _buildOpportunityCard(

            context,

            'City Park Restoration',

            'GreenEarth Org',

            'Central Park',

            'Oct 12 • 9 AM',

            'URGENT',

            Colors.red[50]!,

            Colors.red[700]!,

            'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=800',

            4.5,

            isDark,

          ),

          const SizedBox(height: 24),

          _buildOpportunityCard(

            context,

            'After-School Math Tutor',

            'Future Scholars Foundation',

            'Brooklyn Library',

            'Oct 15 • 3:30 PM',

            'OPEN',

            Colors.green[50]!,

            AppTheme.primary,

            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',

            2.0,

            isDark,

          ),

          const SizedBox(height: 24),

          _buildOpportunityCard(

            context,

            'Senior Tech Literacy Class',

            'Code For All',

            'Downtown Community Center',

            'Oct 18 • 10 AM',

            'CLOSING SOON',

            Colors.orange[50]!,

            Colors.orange[800]!,

            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',

            3.0,

            isDark,

          ),

        ],

      ),

    );

  }

  Widget _buildOpportunityCard(

    BuildContext context,

    String title,

    String org,

    String location,

    String dateTime,

    String badgeText,

    Color badgeBg,

    Color badgeFg,

    String imageUrl,

    double hours,

    bool isDark,

  ) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 10))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Stack(

            children: [

              ClipRRect(

                borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),

                child: Image.network(imageUrl, height: 200, width: double.infinity, fit: BoxFit.cover),

              ),

              Positioned(

                top: 20,

                left: 20,

                child: Container(

                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

                  decoration: BoxDecoration(color: badgeBg, borderRadius: BorderRadius.circular(10)),

                  child: Text(badgeText, style: TextStyle(color: badgeFg, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                ),

              ),

              Positioned(

                bottom: 20,

                right: 20,

                child: Container(

                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

                  decoration: BoxDecoration(color: Colors.white.withOpacity(0.9), borderRadius: BorderRadius.circular(12)),

                  child: Row(

                    children: [

                      const Icon(Icons.access_time, size: 14, color: Colors.blueGrey),

                      const SizedBox(width: 6),

                      Text('${hours} hrs', style: const TextStyle(color: Colors.black87, fontSize: 12, fontWeight: FontWeight.bold)),

                    ],

                  ),

                ),

              ),

            ],

          ),

          Padding(

            padding: const EdgeInsets.all(24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  children: [

                    const Icon(Icons.eco, size: 14, color: AppTheme.primary),

                    const SizedBox(width: 8),

                    Text(org, style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.bold)),

                  ],

                ),

                const SizedBox(height: 12),

                Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

                const SizedBox(height: 12),

                Row(

                  children: [

                    Icon(Icons.location_on, size: 14, color: Colors.grey[400]),

                    const SizedBox(width: 4),

                    Text(location, style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                    const SizedBox(width: 16),

                    Icon(Icons.calendar_today, size: 14, color: Colors.grey[400]),

                    const SizedBox(width: 4),

                    Text(dateTime, style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                  ],

                ),

                const SizedBox(height: 24),

                ElevatedButton(

                  onPressed: () => Navigator.pushNamed(context, '/opportunity-detail'),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: AppTheme.primary,

                    foregroundColor: Colors.white,

                    minimumSize: const Size(double.infinity, 56),

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                    elevation: 0,

                  ),

                  child: const Text('View Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
