
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ConnectedAppsScreen extends StatefulWidget {

  const ConnectedAppsScreen({super.key});

  @override

  State<ConnectedAppsScreen> createState() => _ConnectedAppsScreenState();

}

class _ConnectedAppsScreenState extends State<ConnectedAppsScreen> {

  bool _googleCalendar = true;

  bool _canvasLMS = false;

  bool _spotify = true;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Connected Apps', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

               // Search Bar

              TextField(

                decoration: InputDecoration(

                  filled: true,

                  fillColor: AppTheme.primary.withOpacity(0.05),

                  prefixIcon: const Icon(Icons.search, color: AppTheme.primary, size: 20),

                  hintText: 'Search integrations...',

                  hintStyle: const TextStyle(fontSize: 14),

                  border: OutlineInputBorder(

                    borderRadius: BorderRadius.circular(12),

                    borderSide: BorderSide.none,

                  ),

                  contentPadding: const EdgeInsets.symmetric(vertical: 0),

                ),

              ),

              const SizedBox(height: 32),

              const Text('ACADEMIC & PRODUCTIVITY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 16),

              _ConnectedAppTile(

                icon: Icons.calendar_today_outlined,

                title: 'Google Calendar',

                subtitle: 'Sync class schedule & events',

                value: _googleCalendar,

                onChanged: (val) => setState(() => _googleCalendar = val),

              ),

              const SizedBox(height: 12),

              _ConnectedAppTile(

                icon: Icons.school_outlined,

                title: 'Canvas LMS',

                subtitle: 'Import assignments & grades',

                value: _canvasLMS,

                onChanged: (val) => setState(() => _canvasLMS = val),

              ),

              const SizedBox(height: 12),

               _ConnectedAppTile(

                icon: Icons.groups_outlined,

                title: 'Microsoft Teams',

                subtitle: 'Join study group calls',

                isButton: true,

              ),

              const SizedBox(height: 32),

              const Text('SOCIAL & LIFESTYLE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 16),

              _ConnectedAppTile(

                icon: Icons.music_note_outlined,

                title: 'Spotify',

                subtitle: 'Share your study playlists',

                value: _spotify,

                onChanged: (val) => setState(() => _spotify = val),

              ),

               const SizedBox(height: 12),

               _ConnectedAppTile(

                icon: Icons.mail_outline,

                title: 'Outlook Mail',

                subtitle: 'Direct campus notifications',

                isButton: true,

              ),

               const SizedBox(height: 32),

              Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: AppTheme.primary.withOpacity(0.05),

                  borderRadius: BorderRadius.circular(16),

                  border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

                ),

                child: Row(

                  children: [

                    Icon(Icons.info_outline, color: AppTheme.primary, size: 20),

                    SizedBox(width: 12),

                    Expanded(

                       child: Text(

                        'Campus Social only requests the minimum permissions needed to sync your data. You can revoke access at any time through the app\'s settings.',

                        style: TextStyle(fontSize: 11, color: Colors.grey, height: 1.5),

                      ),

                    ),

                  ],

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

class _ConnectedAppTile extends StatelessWidget {

  final IconData icon;

  final String title;

  final String subtitle;

  final bool? value;

  final ValueChanged<bool>? onChanged;

  final bool isButton;

  const _ConnectedAppTile({

    required this.icon,

    required this.title,

    required this.subtitle,

    this.value,

    this.onChanged,

    this.isButton = false,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

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

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: Icon(icon, color: AppTheme.primary, size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.grey)),

              ],

            ),

          ),

          if (isButton)

            ElevatedButton(

              onPressed: () {},

              child: const Text('Connect'),

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary,

                foregroundColor: Colors.white,

                minimumSize: const Size(80, 32),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                elevation: 0,

                textStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),

              ),

            )

          else

            Switch.adaptive(

              value: value!,

              onChanged: onChanged,

              activeColor: AppTheme.primary,

            ),

        ],

      ),

    );

  }

}
