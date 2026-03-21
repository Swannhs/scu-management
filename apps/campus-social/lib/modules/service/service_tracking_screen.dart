
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceTrackingScreen extends StatelessWidget {

  const ServiceTrackingScreen({super.key});

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

                  padding: const EdgeInsets.all(24.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildImpactCard(isDark),

                      const SizedBox(height: 32),

                      _buildActiveService(isDark),

                      const SizedBox(height: 32),

                      _buildRecentSubmissions(isDark),

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

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

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

                  borderRadius: BorderRadius.circular(12),

                ),

                child: const Icon(Icons.school, color: Colors.white, size: 24),

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

          Row(

            children: [

              IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none, color: Colors.grey)),

              const CircleAvatar(

                radius: 16,

                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=a042581f4e29026704d'),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildImpactCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        gradient: const LinearGradient(

          colors: [AppTheme.primary, Color(0xFF006C46)],

          begin: Alignment.topLeft,

          end: Alignment.bottomRight,

        ),

        borderRadius: BorderRadius.circular(32),

        boxShadow: [

          BoxShadow(

            color: AppTheme.primary.withOpacity(0.2),

            blurRadius: 20,

            offset: const Offset(0, 10),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text(

            'TOTAL IMPACT',

            style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5),

          ),

          const SizedBox(height: 8),

          Row(

            crossAxisAlignment: CrossAxisAlignment.baseline,

            textBaseline: TextBaseline.alphabetic,

            children: const [

              Text(

                '24h',

                style: TextStyle(color: Colors.white, fontSize: 56, fontWeight: FontWeight.w900, fontFamily: 'Public Sans'),

              ),

              SizedBox(width: 8),

              Text(

                'Verified',

                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),

              ),

            ],

          ),

          const SizedBox(height: 24),

          Row(

            children: [

              _buildSimpleStat('Goal Progress', '75%'),

              const SizedBox(width: 16),

              _buildSimpleStat('This Month', '+8h'),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSimpleStat(String label, String value) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      decoration: BoxDecoration(

        color: Colors.white.withOpacity(0.15),

        borderRadius: BorderRadius.circular(16),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text(label.toUpperCase(), style: const TextStyle(color: Colors.white70, fontSize: 8, fontWeight: FontWeight.bold)),

          Text(value, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

  Widget _buildActiveService(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Active Service', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

            Text(

              'LIVE NOW',

              style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2),

            ),

          ],

        ),

        const SizedBox(height: 16),

        Container(

          padding: const EdgeInsets.all(24),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(32),

            boxShadow: [

              BoxShadow(

                color: Colors.black.withOpacity(0.04),

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

                        padding: const EdgeInsets.all(12),

                        decoration: BoxDecoration(

                          color: AppTheme.primary.withOpacity(0.1),

                          borderRadius: BorderRadius.circular(16),

                        ),

                        child: const Icon(Icons.local_florist, color: AppTheme.primary, size: 24),

                      ),

                      const SizedBox(width: 16),

                      Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          const Text('Campus Garden Cleanup', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                          Text('Environmental Club', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                ],

              ),

              const SizedBox(height: 24),

              Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: isDark ? Color(0xFF0F172A)?.withOpacity(0.5) : Color(0xFFF8FAFC),

                  borderRadius: BorderRadius.circular(20),

                ),

                child: Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    _buildMiniInfo('Schedule', 'Today, 2:00 PM - 5:00 PM'),

                    _buildMiniInfo('Location', 'West Quad', isRight: true),

                  ],

                ),

              ),

              const SizedBox(height: 24),

              SizedBox(

                width: double.infinity,

                height: 56,

                child: ElevatedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.play_circle_fill),

                  label: const Text('Start Tracking', style: TextStyle(fontWeight: FontWeight.bold)),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: AppTheme.primary,

                    foregroundColor: Colors.white,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                    elevation: 10,

                    shadowColor: AppTheme.primary.withOpacity(0.3),

                  ),

                ),

              ),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildMiniInfo(String label, String value, {bool isRight = false}) {

    return Column(

      crossAxisAlignment: isRight ? CrossAxisAlignment.end : CrossAxisAlignment.start,

      children: [

        Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold)),

        const SizedBox(height: 2),

        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

      ],

    );

  }

  Widget _buildRecentSubmissions(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Recent Submissions', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

        const SizedBox(height: 16),

        Container(

          padding: const EdgeInsets.all(24),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(32),

            boxShadow: [

              BoxShadow(

                color: Colors.black.withOpacity(0.04),

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

                        padding: const EdgeInsets.all(12),

                        decoration: BoxDecoration(

                          color: Colors.orange.withOpacity(0.1),

                          borderRadius: BorderRadius.circular(16),

                        ),

                        child: const Icon(Icons.calculate, color: Colors.orange, size: 24),

                      ),

                      const SizedBox(width: 16),

                      Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          const Text('Math Tutoring', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                          Text('Academic Success Center', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                ],

              ),

              const SizedBox(height: 24),

              Row(

                children: [

                  _IconLabel(Icons.calendar_today, 'Oct 24, 2023'),

                  const SizedBox(width: 16),

                  _IconLabel(Icons.schedule, '2.5 Hours'),

                ],

              ),

              const SizedBox(height: 24),

              SizedBox(

                width: double.infinity,

                height: 56,

                child: ElevatedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.cloud_upload),

                  label: const Text('Submit Proof', style: TextStyle(fontWeight: FontWeight.bold)),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: isDark ? Color(0xFF1E293B) : Color(0xFFF1F5F9),

                    foregroundColor: isDark ? Colors.white : Colors.black,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                  ),

                ),

              ),

            ],

          ),

        ),

        const SizedBox(height: 16),

        Opacity(

          opacity: 0.8,

          child: Container(

            padding: const EdgeInsets.all(20),

            decoration: BoxDecoration(

              color: isDark ? AppTheme.cardDark : Colors.white,

              borderRadius: BorderRadius.circular(24),

              border: Border.all(color: Color(0xFF64748B).withOpacity(0.1), style: BorderStyle.solid),

            ),

            child: Row(

              children: [

                const Icon(Icons.pets, color: Colors.grey),

                const SizedBox(width: 16),

                Expanded(

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      const Text('Animal Shelter Support', style: TextStyle(fontWeight: FontWeight.bold)),

                      Text('Completed Oct 12 • 4h Verified', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                    ],

                  ),

                ),

                const Icon(Icons.check_circle, color: AppTheme.primary),

              ],

            ),

          ),

        ),

      ],

    );

  }

}

class _IconLabel extends StatelessWidget {

  final IconData icon;

  final String label;

  const _IconLabel(this.icon, this.label);

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 16, color: Colors.grey),

        const SizedBox(width: 6),

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.bold)),

      ],

    );

  }

}
