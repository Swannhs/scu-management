
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SessionCheckInScreen extends StatefulWidget {

  const SessionCheckInScreen({super.key});

  @override

  State<SessionCheckInScreen> createState() => _SessionCheckInScreenState();

}

class _SessionCheckInScreenState extends State<SessionCheckInScreen> {

  bool _isCheckedIn = false;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Session Check-In', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Stack(

        children: [

          SingleChildScrollView(

            child: Padding(

              padding: const EdgeInsets.all(24.0),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  _buildCheckInBanner(isDark),

                  const SizedBox(height: 32),

                  _buildSessionCard(isDark),

                  const SizedBox(height: 32),

                  _buildStatsSection(isDark),

                  const SizedBox(height: 32),

                  _buildCoordinatorSection(isDark),

                  const SizedBox(height: 100),

                ],

              ),

            ),

          ),

          if (_isCheckedIn) _buildSuccessOverlay(isDark),

          Positioned(

            bottom: 48,

            left: 24,

            right: 24,

            child: ElevatedButton(

              onPressed: () {

                setState(() {

                  _isCheckedIn = true;

                });

                Future.delayed(const Duration(seconds: 3), () {

                  if (mounted) setState(() => _isCheckedIn = false);

                });

              },

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary,

                foregroundColor: Colors.white,

                minimumSize: const Size(double.infinity, 64),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

                elevation: 0,

              ),

              child: Row(

                mainAxisAlignment: MainAxisAlignment.center,

                children: const [

                  Icon(Icons.check_circle, size: 20),

                  SizedBox(width: 12),

                  Text('Confirm Attendance', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                ],

              ),

            ),

          ),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildCheckInBanner(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: Colors.green[50]?.withOpacity(0.8),

        borderRadius: BorderRadius.circular(24),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(16)),

            child: const Icon(Icons.person_pin_circle, color: Colors.white),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Check-in Available', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black87)),

                const SizedBox(height: 4),

                Text(

                  'You can now confirm your attendance for today\'s session. Please check-in before 09:15 AM.',

                  style: TextStyle(color: Colors.grey[700], fontSize: 12, height: 1.4),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildSessionCard(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 10))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Padding(

            padding: const EdgeInsets.all(24),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                      decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(8)),

                      child: const Text('ACTIVE MISSION', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

                    ),

                    Text('Tomorrow, 09:00 AM', style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.bold)),

                  ],

                ),

                const SizedBox(height: 16),

                const Text('City Park Restoration', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

                const SizedBox(height: 8),

                Row(

                  children: [

                    const Icon(Icons.location_on, size: 14, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text('Central Park West Entrance, District 5', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                  ],

                ),

                const SizedBox(height: 20),

                _buildAvatarsRow(),

              ],

            ),

          ),

          Stack(

            children: [

              ClipRRect(

                borderRadius: const BorderRadius.vertical(bottom: Radius.circular(32)),

                child: Image.network(r'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=800', height: 180, width: double.infinity, fit: BoxFit.cover),

              ),

              Positioned(

                top: 20,

                left: 20,

                child: Container(

                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),

                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),

                  child: Row(

                    children: [

                      const Icon(Icons.map, size: 14, color: AppTheme.primary),

                      const SizedBox(width: 6),

                      const Text('VIEW MAP', style: TextStyle(color: Colors.black87, fontSize: 10, fontWeight: FontWeight.bold)),

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

  Widget _buildAvatarsRow() {

    return Row(

      children: [

        for (int i = 0; i < 3; i++)

          Align(

            widthFactor: 0.7,

            child: CircleAvatar(

              radius: 14,

              backgroundColor: Colors.white,

              child: CircleAvatar(radius: 12, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user$i')),

            ),

          ),

        const SizedBox(width: 12),

        Text('+12 others', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildStatsSection(bool isDark) {

    return Row(

      children: [

        Expanded(

          child: Container(

            padding: const EdgeInsets.all(24),

            decoration: BoxDecoration(

              color: isDark ? AppTheme.cardDark : Colors.grey[50],

              borderRadius: BorderRadius.circular(24),

            ),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('DURATION', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                const SizedBox(height: 12),

                const Text('4.5 Hours', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

                const SizedBox(height: 4),

                Text('Credits: 12.0 pts', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildCoordinatorSection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text('COORDINATOR', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 16),

          Row(

            children: [

              const CircleAvatar(radius: 20, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=sarah')),

              const SizedBox(width: 16),

              const Text('Sarah Jenkins', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            ],

          ),

          const SizedBox(height: 24),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: Colors.white,

              foregroundColor: Colors.black87,

              minimumSize: const Size(double.infinity, 56),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              elevation: 0,

            ),

            child: const Text('Message', style: TextStyle(fontWeight: FontWeight.bold)),

          ),

        ],

      ),

    );

  }

  Widget _buildSuccessOverlay(bool isDark) {

    return Positioned(

      top: 100,

      left: 24,

      right: 24,

      child: TweenAnimationBuilder<double>(

        tween: Tween(begin: 0.0, end: 1.0),

        duration: const Duration(milliseconds: 300),

        builder: (context, value, child) {

          return Opacity(

            opacity: value,

            child: Transform.translate(

              offset: Offset(0, 20 * (1 - value)),

              child: Container(

                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),

                decoration: BoxDecoration(color: Colors.black.withOpacity(0.9), borderRadius: BorderRadius.circular(24)),

                child: Row(

                  children: [

                    const Icon(Icons.check_circle, color: AppTheme.primary, size: 24),

                    const SizedBox(width: 16),

                    Expanded(

                      child: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: const [

                          Text('You\'re all set!', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),

                          Text('Attendance confirmed.', style: TextStyle(color: Colors.grey, fontSize: 12)),

                        ],

                      ),

                    ),

                    TextButton(onPressed: () => setState(() => _isCheckedIn = false), child: const Text('Undo', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold))),

                  ],

                ),

              ),

            ),

          );

        },

      ),

    );

  }

}
