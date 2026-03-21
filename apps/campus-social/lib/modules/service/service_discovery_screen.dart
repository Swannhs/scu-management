
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceDiscoveryScreen extends StatelessWidget {

  const ServiceDiscoveryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(isDark),

            Expanded(

              child: SingleChildScrollView(

                child: Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 24.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildQuickNav(isDark),

                      const SizedBox(height: 32),

                      _buildFeaturedService(context, isDark),

                      const SizedBox(height: 32),

                      _buildCategories(isDark),

                      const SizedBox(height: 32),

                      _buildRecentOpportunities(isDark),

                      const SizedBox(height: 100),

                    ],

                  ),

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(24.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              Container(

                width: 40,

                height: 40,

                decoration: BoxDecoration(

                  color: AppTheme.primary,

                  shape: BoxShape.circle,

                ),

                child: const Icon(Icons.shield, color: Colors.white, size: 20),

              ),

              const SizedBox(width: 12),

              const Text(

                'SCU Mobile',

                style: TextStyle(

                  color: AppTheme.primary,

                  fontFamily: 'Public Sans',

                  fontSize: 20,

                  fontWeight: FontWeight.w900,

                  letterSpacing: -0.5,

                ),

              ),

            ],

          ),

          IconButton(

            onPressed: () {},

            icon: const Icon(Icons.notifications_none, color: Colors.grey),

          ),

        ],

      ),

    );

  }

  Widget _buildQuickNav(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      child: Row(

        children: [

          _buildQuickNavItem('My Applications', Icons.assignment_turned_in, AppTheme.primary, isDark),

          const SizedBox(width: 12),

          _buildQuickNavItem('Achievements', Icons.emoji_events, Colors.orange, isDark),

          const SizedBox(width: 12),

          _buildQuickNavItem('Tracking', Icons.timer, Colors.blue, isDark, route: '/service-tracking'),

        ],

      ),

    );

  }

  Widget _buildQuickNavItem(String label, IconData icon, Color color, bool isDark, {String? route}) {

    return Builder(

      builder: (context) => GestureDetector(

        onTap: () {

          if (route != null) Navigator.pushNamed(context, route);

        },

        child: Container(

          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(16),

            boxShadow: [

              BoxShadow(

                color: Colors.black.withOpacity(0.02),

                blurRadius: 10,

                offset: const Offset(0, 4),

              ),

            ],

          ),

          child: Row(

            children: [

              Icon(icon, color: color, size: 20),

              const SizedBox(width: 8),

              Text(

                label,

                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),

              ),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildFeaturedService(BuildContext context, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Featured Service',

          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Public Sans', letterSpacing: -0.5),

        ),

        const SizedBox(height: 16),

        GestureDetector(

          onTap: () => Navigator.pushNamed(context, '/opportunity-detail'),

          child: Container(

            decoration: BoxDecoration(

              color: isDark ? AppTheme.cardDark : Colors.white,

              borderRadius: BorderRadius.circular(32),

              boxShadow: [

                BoxShadow(

                  color: Colors.black.withOpacity(0.04),

                  blurRadius: 32,

                  offset: const Offset(0, 16),

                ),

              ],

            ),

            child: Column(

              children: [

                Stack(

                  children: [

                    ClipRRect(

                      borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),

                      child: Image.network(

                        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',

                        height: 220,

                        width: double.infinity,

                        fit: BoxFit.cover,

                      ),

                    ),

                    Positioned(

                      top: 16,

                      left: 16,

                      child: Container(

                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

                        decoration: BoxDecoration(

                          color: Colors.red[100],

                          borderRadius: BorderRadius.circular(20),

                        ),

                        child: Row(

                          mainAxisSize: MainAxisSize.min,

                          children: [

                            Icon(Icons.priority_high, color: Colors.red[900], size: 14),

                            const SizedBox(width: 4),

                            Text(

                              'URGENT',

                              style: TextStyle(color: Colors.red[900], fontSize: 10, fontWeight: FontWeight.bold),

                            ),

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

                        mainAxisAlignment: MainAxisAlignment.spaceBetween,

                        children: [

                          const Expanded(

                            child: Text(

                              'Campus Garden Cleanup',

                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans'),

                            ),

                          ),

                          Container(

                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

                            decoration: BoxDecoration(

                              color: AppTheme.primary.withOpacity(0.1),

                              borderRadius: BorderRadius.circular(8),

                            ),

                            child: const Text('25 Slots Left', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

                          ),

                        ],

                      ),

                      const SizedBox(height: 12),

                      Text(

                        'Help restore our sustainable campus ecosystem. Verified service hours provided for all participants.',

                        style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

                      ),

                      const SizedBox(height: 24),

                      Row(

                        mainAxisAlignment: MainAxisAlignment.spaceBetween,

                        children: [

                          Row(

                            children: [

                              _IconInfo(Icons.schedule, '4 Hours'),

                              const SizedBox(width: 16),

                              _IconInfo(Icons.location_on, 'Main Quad'),

                            ],

                          ),

                          ElevatedButton(

                            onPressed: () {},

                            style: ElevatedButton.styleFrom(

                              backgroundColor: AppTheme.primary,

                              foregroundColor: Colors.white,

                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),

                            ),

                            child: const Text('Apply', style: TextStyle(fontWeight: FontWeight.bold)),

                          ),

                        ],

                      ),

                    ],

                  ),

                ),

              ],

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildCategories(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Categories', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Public Sans', letterSpacing: -0.5)),

            TextButton(

              onPressed: () {},

              child: const Text('View All', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

        const SizedBox(height: 16),

        Row(

          children: [

            Expanded(

              child: Container(

                height: 160,

                padding: const EdgeInsets.all(24),

                decoration: BoxDecoration(

                  color: AppTheme.primary.withOpacity(0.05),

                  borderRadius: BorderRadius.circular(32),

                  border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

                ),

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: const [

                    Icon(Icons.nature_people, color: AppTheme.primary, size: 32),

                    Text(

                      'Environment &\nSustainability',

                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, height: 1.2),

                    ),

                  ],

                ),

              ),

            ),

            const SizedBox(width: 16),

            Expanded(

              child: Column(

                children: [

                  _buildSubCategory('Tutoring', Icons.school, Colors.red, isDark),

                  const SizedBox(height: 16),

                  _buildSubCategory('Community', Icons.groups, Colors.teal, isDark),

                ],

              ),

            ),

          ],

        ),

      ],

    );

  }

  Widget _buildSubCategory(String label, IconData icon, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: color.withOpacity(0.05),

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: color.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Icon(icon, color: color, size: 24),

          const SizedBox(width: 12),

          Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ],

      ),

    );

  }

  Widget _buildRecentOpportunities(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Recent Opportunities',

          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Public Sans', letterSpacing: -0.5),

        ),

        const SizedBox(height: 16),

        _OpportunityListItem(

          title: 'Library Archival Assistant',

          location: '0.4 miles',

          time: 'Tomorrow, 2:00 PM',

          icon: Icons.library_books,

          tags: const ['Open', 'Verified Service Hours'],

          isDark: isDark,

        ),

        const SizedBox(height: 12),

        _OpportunityListItem(

          title: 'Soup Kitchen Help',

          location: '1.2 miles',

          time: 'Saturday, 10:00 AM',

          icon: Icons.restaurant,

          tags: const ['Open'],

          isDark: isDark,

        ),

      ],

    );

  }

}

class _IconInfo extends StatelessWidget {

  final IconData icon;

  final String label;

  const _IconInfo(this.icon, this.label);

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 16, color: Colors.grey),

        const SizedBox(width: 4),

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w500)),

      ],

    );

  }

}

class _OpportunityListItem extends StatelessWidget {

  final String title;

  final String location;

  final String time;

  final IconData icon;

  final List<String> tags;

  final bool isDark;

  const _OpportunityListItem({

    required this.title,

    required this.location,

    required this.time,

    required this.icon,

    required this.tags,

    required this.isDark,

  });

  @override

  Widget build(BuildContext context) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(

              color: Color(0xFFF8FAFC),

              borderRadius: BorderRadius.circular(16),

            ),

            child: Icon(icon, color: Colors.grey[400], size: 28),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Wrap(

                  spacing: 8,

                  children: tags.map((tag) => Container(

                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                    decoration: BoxDecoration(

                      color: tag == 'Open' ? AppTheme.primary.withOpacity(0.1) : Colors.teal.withOpacity(0.1),

                      borderRadius: BorderRadius.circular(20),

                    ),

                    child: Text(

                      tag.toUpperCase(),

                      style: TextStyle(

                        color: tag == 'Open' ? AppTheme.primary : Colors.teal,

                        fontSize: 9,

                        fontWeight: FontWeight.bold,

                      ),

                    ),

                  )).toList(),

                ),

                const SizedBox(height: 12),

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                const SizedBox(height: 6),

                Row(

                  children: [

                    Icon(Icons.location_on, size: 12, color: Colors.grey[400]),

                    const SizedBox(width: 4),

                    Text(location, style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.w500)),

                    const SizedBox(width: 8),

                    Container(width: 3, height: 3, decoration: BoxDecoration(color: Colors.grey[300], shape: BoxShape.circle)),

                    const SizedBox(width: 8),

                    Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.w500)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
