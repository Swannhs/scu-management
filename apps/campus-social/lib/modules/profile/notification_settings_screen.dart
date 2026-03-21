
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class NotificationSettingsScreen extends StatefulWidget {

  const NotificationSettingsScreen({super.key});

  @override

  State<NotificationSettingsScreen> createState() => _NotificationSettingsScreenState();

}

class _NotificationSettingsScreenState extends State<NotificationSettingsScreen> {

  bool _pushMessages = true;

  bool _inAppMessages = true;

  bool _emailMessages = false;

  bool _pushRequests = true;

  bool _inAppRequests = true;

  bool _emailRequests = true;

  bool _pushActivities = true;

  bool _inAppActivities = true;

  bool _emailActivities = false;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Notification Settings', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('MESSAGES', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _SettingsTileGroup(

                children: [

                   _SwitchRow(

                    title: 'Push Notifications',

                    subtitle: 'Direct messages and group chats',

                    value: _pushMessages,

                    onChanged: (val) => setState(() => _pushMessages = val),

                  ),

                   _SwitchRow(

                    title: 'In-App Notifications',

                    value: _inAppMessages,

                    onChanged: (val) => setState(() => _inAppMessages = val),

                  ),

                   _SwitchRow(

                    title: 'Email Alerts',

                    value: _emailMessages,

                    onChanged: (val) => setState(() => _emailMessages = val),

                  ),

                ],

               ),

               const SizedBox(height: 32),

              const Text('REQUESTS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _SettingsTileGroup(

                children: [

                   _SwitchRow(

                    title: 'Push Notifications',

                    subtitle: 'New connection requests',

                    value: _pushRequests,

                    onChanged: (val) => setState(() => _pushRequests = val),

                  ),

                   _SwitchRow(

                    title: 'In-App Notifications',

                    value: _inAppRequests,

                    onChanged: (val) => setState(() => _inAppRequests = val),

                  ),

                   _SwitchRow(

                    title: 'Email Alerts',

                    value: _emailRequests,

                    onChanged: (val) => setState(() => _emailRequests = val),

                  ),

                ],

               ),

               const SizedBox(height: 32),

              const Text('ACTIVITIES', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _SettingsTileGroup(

                children: [

                   _SwitchRow(

                    title: 'Push Notifications',

                    subtitle: 'Likes, comments, and mentions',

                    value: _pushActivities,

                    onChanged: (val) => setState(() => _pushActivities = val),

                  ),

                   _SwitchRow(

                    title: 'In-App Notifications',

                    value: _inAppActivities,

                    onChanged: (val) => setState(() => _inAppActivities = val),

                  ),

                   _SwitchRow(

                    title: 'Email Alerts',

                    value: _emailActivities,

                    onChanged: (val) => setState(() => _emailActivities = val),

                  ),

                ],

               ),

               const SizedBox(height: 32),

               SizedBox(

                  width: double.infinity,

                  child: OutlinedButton(

                    onPressed: () {},

                    child: const Text('Manage Specific Event Alerts', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

                    style: OutlinedButton.styleFrom(

                      side: BorderSide(color: AppTheme.primary.withOpacity(0.2), width: 2),

                      padding: const EdgeInsets.symmetric(vertical: 20),

                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                    ),

                  ),

               ),

               const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

}

class _SettingsTileGroup extends StatelessWidget {

  final List<Widget> children;

  const _SettingsTileGroup({required this.children});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

        boxShadow: [

           BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        children: List.generate(children.length * 2 - 1, (index) {

          if (index.isOdd) return Divider(height: 1, color: Colors.grey.withOpacity(0.05), indent: 16);

          return children[index ~/ 2];

        }),

      ),

    );

  }

}

class _SwitchRow extends StatelessWidget {

  final String title;

  final String? subtitle;

  final bool value;

  final ValueChanged<bool> onChanged;

  const _SwitchRow({

    required this.title,

    this.subtitle,

    required this.value,

    required this.onChanged,

  });

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

           Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              if (subtitle != null)

                Text(subtitle!, style: const TextStyle(fontSize: 12, color: Colors.grey)),

            ],

          ),

          Switch.adaptive(

            value: value,

            onChanged: onChanged,

            activeColor: AppTheme.primary,

          ),

        ],

      ),

    );

  }

}
