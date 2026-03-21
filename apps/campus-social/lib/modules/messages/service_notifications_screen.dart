
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceNotificationsScreen extends StatelessWidget {

  const ServiceNotificationsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Notifications', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          TextButton(

            onPressed: () {},

            child: const Text('Mark all as read', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            _buildFilters(isDark),

            const SizedBox(height: 24),

            _buildSectionHeader('TODAY'),

            const SizedBox(height: 16),

            _buildNotificationItem(

              icon: Icons.check_circle,

              iconColor: AppTheme.primary,

              title: 'Application Approved',

              subtitle: "Your application for 'City Park Restoration' has been approved.",

              time: '10:45 AM',

              isNew: true,

              isDark: isDark,

            ),

            const SizedBox(height: 12),

            _buildNotificationItem(

              icon: Icons.chat_bubble,

              iconColor: Colors.red[300]!,

              title: 'New Message',

              subtitle: 'Coordinator: "Don\'t forget to bring your ID for tomorrow\'s session."',

              time: '08:12 AM',

              isNew: true,

              hasAction: true,

              actionLabel: 'Reply Now',

              isDark: isDark,

            ),

            const SizedBox(height: 32),

            _buildSectionHeader('YESTERDAY'),

            const SizedBox(height: 16),

            _buildNotificationItem(

              icon: Icons.access_time,

              iconColor: Colors.grey,

              title: 'Attendance Reminder',

              subtitle: "Please remember to clock in for the Community Kitchen session.",

              time: '4:20 PM',

              isNew: false,

              isDark: isDark,

            ),

            const SizedBox(height: 12),

            _buildNotificationItem(

              icon: Icons.info,

              iconColor: Colors.blueGrey,

              title: 'Policy Update',

              subtitle: "We've updated our volunteering guidelines for 2024.",

              time: '11:00 AM',

              isNew: false,

              isDark: isDark,

            ),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildFilters(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),

      child: Row(

        children: [

          _buildFilterChip('All', true, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Applications', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Sessions', false, isDark),

          const SizedBox(width: 8),

          _buildFilterChip('Messages', false, isDark),

        ],

      ),

    );

  }

  Widget _buildFilterChip(String label, bool isSelected, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),

      decoration: BoxDecoration(

        color: isSelected ? AppTheme.primary : (isDark ? AppTheme.cardDark : Colors.grey[200]),

        borderRadius: BorderRadius.circular(12),

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

  Widget _buildSectionHeader(String title) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Text(title, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),

    );

  }

  Widget _buildNotificationItem({

    required IconData icon,

    required Color iconColor,

    required String title,

    required String subtitle,

    required String time,

    required bool isNew,

    required bool isDark,

    bool hasAction = false,

    String? actionLabel,

  }) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Container(

        padding: const EdgeInsets.all(20),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(20),

          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

        ),

        child: Row(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Container(

              padding: const EdgeInsets.all(10),

              decoration: BoxDecoration(color: iconColor.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

              child: Icon(icon, color: iconColor, size: 24),

            ),

            const SizedBox(width: 16),

            Expanded(

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Row(

                    mainAxisAlignment: MainAxisAlignment.spaceBetween,

                    children: [

                      Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                      Row(

                        children: [

                          Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 11)),

                          if (isNew) ...[

                            const SizedBox(width: 6),

                            Container(width: 6, height: 6, decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle)),

                          ],

                        ],

                      ),

                    ],

                  ),

                  const SizedBox(height: 6),

                  Text(subtitle, style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.4)),

                  if (hasAction) ...[

                    const SizedBox(height: 12),

                    InkWell(

                      onTap: () {},

                      child: Row(

                        children: [

                          Text(actionLabel!, style: const TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.bold)),

                          const SizedBox(width: 4),

                          const Icon(Icons.arrow_forward, size: 14, color: AppTheme.primary),

                        ],

                      ),

                    ),

                  ],

                ],

              ),

            ),

          ],

        ),

      ),

    );

  }

}
