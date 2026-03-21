
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class UserProfileScreen extends StatelessWidget {

  const UserProfileScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Campus Social', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        centerTitle: true,

        actions: [

          IconButton(

            icon: const Icon(Icons.more_vert),

            onPressed: () {},

          ),

        ],

      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            // Cover Photo & Profile Avatar

            Stack(

              clipBehavior: Clip.none,

              alignment: Alignment.center,

              children: [

                Container(

                  height: 180,

                  width: double.infinity,

                  decoration: BoxDecoration(

                    image: DecorationImage(

                      image: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuCqQn9ziMFC5F8yGImzoRwczi-69qNmHmM1bYxeJrpPLQfFoyVhe03ZcmIvj5qW3WZFwK1VauMTrf69sR7rbw9Xcv9-cRuyAUK5zlajdvKP2QLwpsd-nsV_Dd324OPBzJz2_qekWJTDUxQFHmrWOJs7g0TtlMUfeCpzrhTXpMDxSb0Ny0mrbpgalamConnybEvafXFBRbYhLJlfiN7ZQ4d8IRLB4yzw3_O2v8j9Wj9e1x8c15aMP1Us2MSR4H9MDeIC3wGgh1-Bhzz7'),

                      fit: BoxFit.cover,

                    ),

                  ),

                ),

                Positioned(

                  bottom: -60,

                  child: Container(

                    padding: const EdgeInsets.all(4),

                    decoration: BoxDecoration(

                      color: Theme.of(context).scaffoldBackgroundColor,

                      shape: BoxShape.circle,

                      boxShadow: [

                        BoxShadow(

                          color: Colors.black.withOpacity(0.1),

                          blurRadius: 10,

                          offset: const Offset(0, 4),

                        ),

                      ],

                    ),

                    child: const CircleAvatar(

                      radius: 60,

                      backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDG6xGS1LLl48cVSA4CemlTxoTS2I-zeKVxtAidmXyiFUXGliCToNkUKDUJCHS4QuxE00qMnolxeUgIaoIrjuWi80uXtgs0f4P1gSJJ3R9z78DnMxgi40it5u6PS0M7m0hHvHegwjfMXcuAuwxLc_35HVrSwEJHuSSZJ49whGNZLJSXFxMjm9XtV7hWyrehdR03m6iGWfAWza9H1JBcG6F9MXvte6Bw-3ytzBCZF_5E3_tcirymO9Ve7iIk673pAlud3S7MSYL13wFh'),

                    ),

                  ),

                ),

              ],

            ),

            const SizedBox(height: 70),

            // Profile Details

            const Text(

              'Alex Johnson',

              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),

            ),

            const Text(

              'Computer Science Department',

              style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w500),

            ),

            const Text(

              'Student ID: CS-2024-0891',

              style: TextStyle(color: Colors.grey, fontSize: 13),

            ),

            Padding(

              padding: EdgeInsets.symmetric(horizontal: 40.0, vertical: 16),

              child: Text(

                'Passionate about AI, hiking, and campus hackathons. Let\'s build something cool!',

                textAlign: TextAlign.center,

                style: TextStyle(fontSize: 14, color: Colors.grey, height: 1.5),

              ),

            ),

            // Stats row

            Container(

              padding: const EdgeInsets.symmetric(vertical: 16),

              decoration: BoxDecoration(

                border: Border.symmetric(horizontal: BorderSide(color: Colors.grey.withOpacity(0.1))),

              ),

              child: Row(

                mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                children: [

                  _StatItem(value: '142', label: 'Posts'),

                  _StatItem(value: '892', label: 'Friends'),

                  _StatItem(value: '12', label: 'Groups'),

                ],

              ),

            ),

            // Action Buttons

            Padding(

              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),

              child: Row(

                children: [

                  Expanded(

                    child: ElevatedButton.icon(

                      onPressed: () {},

                      icon: const Icon(Icons.edit, size: 18),

                      label: const Text('Edit Profile'),

                      style: ElevatedButton.styleFrom(

                        backgroundColor: AppTheme.primary,

                        foregroundColor: Colors.white,

                        padding: const EdgeInsets.symmetric(vertical: 16),

                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                      ),

                    ),

                  ),

                  const SizedBox(width: 12),

                  Expanded(

                    child: ElevatedButton.icon(

                      onPressed: () {},

                      icon: const Icon(Icons.share, size: 18),

                      label: const Text('Share'),

                      style: ElevatedButton.styleFrom(

                        backgroundColor: AppTheme.primary.withOpacity(0.1),

                        foregroundColor: AppTheme.primary,

                        padding: const EdgeInsets.symmetric(vertical: 16),

                        elevation: 0,

                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                      ),

                    ),

                  ),

                ],

              ),

            ),

            // Tabs bar (simplified)

            Container(

              decoration: BoxDecoration(

                border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.1))),

              ),

              child: Row(

                mainAxisAlignment: MainAxisAlignment.spaceAround,

                children: [

                  _TabItem(label: 'Posts', isActive: true),

                  _TabItem(label: 'Friends'),

                  _TabItem(label: 'Groups'),

                  _TabItem(label: 'Media'),

                ],

              ),

            ),

            // Post preview

            Padding(

              padding: const EdgeInsets.all(16.0),

              child: Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: isDark ? const Color(0xFF1E293B) : Color(0xFF64748B).withOpacity(0.05),

                  borderRadius: BorderRadius.circular(16),

                ),

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Row(

                      children: [

                         CircleAvatar(

                          radius: 18,

                          backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuCoLdgxts7lqXdeyYkUjHKQLUjj5MCy0kQCtKjoMVv6khUj_83bSz0rSR-5HdAVPXXYWx-8f4j2Nz29UBeZyn77KLi3hO05eAMBVZOeDIyiEadaS3PuEj4RLtA1CVeU9wSbjnXsB8fYbj33pzRG11I8QzGrDrya53ezp_LqUszMtiS6xpweCCrdfHVUxMXS0o05E7FXuoEvE70IH5dxwC1Rj2gqvZmWSap0TLNVQmPQlFJLLq8OPDPfmcK7aH12oaXhO7y9nwdGcKKC'),

                        ),

                        SizedBox(width: 12),

                        Column(

                          crossAxisAlignment: CrossAxisAlignment.start,

                          children: [

                            Text('Alex Johnson', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                            Text('2 HOURS AGO', style: TextStyle(fontSize: 9, color: Colors.grey, fontWeight: FontWeight.bold)),

                          ],

                        ),

                      ],

                    ),

                    const SizedBox(height: 12),

                    const Text(

                      'Just finished the mid-semester hackathon project! AI-driven study planner is finally live. 🚀',

                      style: TextStyle(fontSize: 13),

                    ),

                    const SizedBox(height: 12),

                    ClipRRect(

                      borderRadius: BorderRadius.circular(12),

                      child: Image.network(

                        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2_qNUo6V0zZMefWxjYvodbHD_PKd3KALsKP_Na7IWzOuRdoEzzsQC4osS8Vzhtjp7tnP8uZGUK0BJTWIJIkOqBDP2hSfpFAiKP565pl3q9_7wQYQiVBnkdOWqa6HNrf_RIDP8MPUjXDiKPovSVtx6R6rg4e-w5UwlpQFFahnwG5YVQc4i9Xa0SOYEe73j6a-M1yS-dT5vYI88iMC9DoliVreb_20HZI_ct8OD-N280ZFsNeFT6XGTDF3FjyZgycjahkfbncUiX-lT',

                        height: 160,

                        width: double.infinity,

                        fit: BoxFit.cover,

                      ),

                    ),

                    const SizedBox(height: 16),

                    Row(

                       children: [

                        _PostStatIcon(icon: Icons.favorite_border, value: '48'),

                        const SizedBox(width: 16),

                        _PostStatIcon(icon: Icons.chat_bubble_outline, value: '12'),

                      ],

                    ),

                  ],

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 4),

    );

  }

}

class _StatItem extends StatelessWidget {

  final String value;

  final String label;

  const _StatItem({required this.value, required this.label});

  @override

  Widget build(BuildContext context) {

    return Column(

      children: [

        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        Text(label.toUpperCase(), style: const TextStyle(fontSize: 10, color: Colors.grey, letterSpacing: 1.1)),

      ],

    );

  }

}

class _TabItem extends StatelessWidget {

  final String label;

  final bool isActive;

  const _TabItem({required this.label, this.isActive = false});

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 12.0),

      child: Text(

        label,

        style: TextStyle(

          fontSize: 13,

          fontWeight: FontWeight.bold,

          color: isActive ? AppTheme.primary : Colors.grey,

        ),

      ),

    );

  }

}

class _PostStatIcon extends StatelessWidget {

  final IconData icon;

  final String value;

  const _PostStatIcon({required this.icon, required this.value});

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 18, color: Colors.grey),

        const SizedBox(width: 4),

        Text(value, style: const TextStyle(fontSize: 11, color: Colors.grey)),

      ],

    );

  }

}
