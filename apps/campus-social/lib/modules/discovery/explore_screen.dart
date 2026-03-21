
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ExploreScreen extends StatelessWidget {

  const ExploreScreen({super.key});

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

                const Text(

                  'Explore Campus',

                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: -0.5),

                ),

                const SizedBox(height: 8),

                Text(

                  'Everything you need in one place',

                  style: TextStyle(color: Colors.grey[500], fontSize: 16),

                ),

                const SizedBox(height: 32),

                _buildServiceGrid(context, isDark),

                const SizedBox(height: 40),

                _buildRecentSection(isDark),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 1), // Explore index

    );

  }

  Widget _buildServiceGrid(BuildContext context, bool isDark) {

    final services = [

      {'title': 'Courses', 'icon': Icons.school, 'color': Colors.blue, 'route': '/academic', 'desc': 'Lectures & Schedule'},
      {'title': 'Library', 'icon': Icons.local_library, 'color': AppTheme.primary, 'route': '/library', 'desc': 'Books & Reservations'},
      {'title': 'Marketplace', 'icon': Icons.storefront, 'color': Colors.orange, 'route': '/marketplace', 'desc': 'Buy & Sell Gear'},
      {'title': 'Research', 'icon': Icons.science, 'color': Colors.purple, 'route': '/journals-hub', 'desc': 'Journals & Papers'},
      {'title': 'Service', 'icon': Icons.volunteer_activism, 'color': Colors.red, 'route': '/service-discovery', 'desc': 'Volunteering'},
      {'title': 'Groups', 'icon': Icons.groups, 'color': Colors.teal, 'route': '/groups', 'desc': 'Clubs & Societies'},
      {'title': 'Results', 'icon': Icons.grade, 'color': Colors.pink, 'route': '/academic-results', 'desc': 'Grades & GPA'},
      {'title': 'Awards', 'icon': Icons.military_tech, 'color': Colors.indigo, 'route': '/achievements-certificates', 'desc': 'Badges & Certificates'},
      {'title': 'Teacher', 'icon': Icons.admin_panel_settings, 'color': Colors.brown, 'route': '/teacher-dashboard', 'desc': 'Service Management'},

    ];

    return GridView.builder(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(

        crossAxisCount: 2,

        crossAxisSpacing: 16,

        mainAxisSpacing: 16,

        childAspectRatio: 1.1,

      ),

      itemCount: services.length,

      itemBuilder: (context, index) {

        final service = services[index];

        return _buildServiceCard(context, service, isDark);

      },

    );

  }

  Widget _buildServiceCard(BuildContext context, Map<String, dynamic> service, bool isDark) {

    Color color = service['color'] as Color;

    return GestureDetector(

      onTap: () => Navigator.pushNamed(context, service['route'] as String),

      child: Container(

        padding: const EdgeInsets.all(16),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(24),

          border: Border.all(color: color.withOpacity(0.1)),

          boxShadow: [

            BoxShadow(

              color: color.withOpacity(0.05),

              blurRadius: 10,

              offset: const Offset(0, 4),

            ),

          ],

        ),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(

                color: color.withOpacity(0.1),

                borderRadius: BorderRadius.circular(12),

              ),

              child: Icon(service['icon'] as IconData, color: color, size: 24),

            ),

            Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(

                  service['title'] as String,

                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),

                ),

                Text(

                  service['desc'] as String,

                  style: TextStyle(color: Colors.grey[500], fontSize: 11),

                ),

              ],

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildRecentSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Recently Accessed',

          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

        ),

        const SizedBox(height: 16),

        _buildRecentItem('Advanced Calculus - PS4', 'Due in 4 hours', Icons.assignment, Colors.amber, isDark),

        const SizedBox(height: 12),

        _buildRecentItem('Mastering Data Structures', 'Professor Sarah Jenkins', Icons.play_circle_fill, AppTheme.primary, isDark),

      ],

    );

  }

  Widget _buildRecentItem(String title, String sub, IconData icon, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

      ),

      child: Row(

        children: [

          Icon(icon, color: color, size: 24),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(sub, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

          const Icon(Icons.chevron_right, color: Colors.grey, size: 20),

        ],

      ),

    );

  }

}
