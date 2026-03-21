
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class GroupEventsScreen extends StatelessWidget {

  final String groupName;

  const GroupEventsScreen({super.key, this.groupName = 'Robotics Club'});

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

                padding: const EdgeInsets.symmetric(horizontal: 16),

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    _buildSectionHeader(),

                    _buildEventCard(

                      'Weekly Workshop',

                      'Oct 12, 4:00 PM',

                      'Robotics Lab, Room 302',

                      Icons.precision_manufacturing,

                      true,

                      isDark,

                    ),

                    const SizedBox(height: 16),

                    _buildEventCard(

                      'Competition Prep',

                      'Oct 15, 5:30 PM',

                      'Innovation Hub, Lab 1',

                      Icons.emoji_events,

                      false,

                      isDark,

                    ),

                    const SizedBox(height: 16),

                    _buildEventCard(

                      'Guest Lecture: AI Trends',

                      'Oct 20, 2:00 PM',

                      'Auditorium B, Main Hall',

                      Icons.record_voice_over,

                      false,

                      isDark,

                    ),

                    const SizedBox(height: 120),

                  ],

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

      floatingActionButton: FloatingActionButton(

        onPressed: () {},

        backgroundColor: AppTheme.primary,

        child: const Icon(Icons.add, color: Colors.white),

      ),

    );

  }

  Widget _buildHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.fromLTRB(16, 24, 16, 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(groupName.toUpperCase(), style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.2)),

              const Text('Group Events', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: -0.5)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader() {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 24),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          const Text('Upcoming Events', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

            child: const Text('3 Scheduled', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),

          ),

        ],

      ),

    );

  }

  Widget _buildEventCard(String title, String time, String location, IconData icon, bool isGoing, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A)?.withOpacity(0.5) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Row(

            children: [

              Container(

                width: 80,

                height: 80,

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

                child: Icon(icon, color: AppTheme.primary, size: 32),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    const SizedBox(height: 8),

                    _IconText(Icons.calendar_today, time),

                    const SizedBox(height: 4),

                    _IconText(Icons.location_on, location),

                  ],

                ),

              ),

            ],

          ),

          const SizedBox(height: 16),

          const Divider(height: 1),

          const SizedBox(height: 16),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              _buildAvatarStack(),

              ElevatedButton.icon(

                onPressed: () {},

                icon: Icon(isGoing ? Icons.check_circle : Icons.add_task, size: 16),

                label: Text(isGoing ? 'Going' : 'Join'),

                style: ElevatedButton.styleFrom(

                  backgroundColor: isGoing ? AppTheme.primary : (isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6)),

                  foregroundColor: isGoing ? Colors.white : (isDark ? Colors.white : Color(0xFF0F172A)),

                  elevation: 0,

                  shape: const StadiumBorder(),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildAvatarStack() {

    return Row(

      children: [

        for (int i = 0; i < 2; i++)

          Transform.translate(

            offset: Offset(i * -10.0, 0),

            child: Container(

              width: 28,

              height: 28,

              decoration: BoxDecoration(

                shape: BoxShape.circle,

                border: Border.all(color: Colors.white, width: 2),

                image: const DecorationImage(image: NetworkImage('https://i.pravatar.cc/100')),

              ),

            ),

          ),

        Transform.translate(

          offset: const Offset(-20, 0),

          child: Container(

            width: 28,

            height: 28,

            decoration: BoxDecoration(

              color: AppTheme.primary,

              shape: BoxShape.circle,

              border: Border.all(color: Colors.white, width: 2),

            ),

            alignment: Alignment.center,

            child: const Text('+12', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),

          ),

        ),

      ],

    );

  }

}

class _IconText extends StatelessWidget {

  final IconData icon;

  final String text;

  const _IconText(this.icon, this.text);

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 14, color: Colors.grey[500]),

        const SizedBox(width: 6),

        Text(text, style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.w500)),

      ],

    );

  }

}
