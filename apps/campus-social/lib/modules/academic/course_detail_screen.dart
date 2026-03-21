
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class CourseDetailScreen extends StatelessWidget {

  const CourseDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: Stack(

        children: [

          CustomScrollView(

            slivers: [

              _buildAppBar(context, isDark),

              SliverToBoxAdapter(

                child: Column(

                  children: [

                    _buildHeroSection(isDark),

                    _buildInstructorInfo(isDark),

                    _buildTabs(isDark),

                    _buildResourcesTab(isDark),

                    const SizedBox(height: 120),

                  ],

                ),

              ),

            ],

          ),

          _buildFloatingActionButton(),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildAppBar(BuildContext context, bool isDark) {

    return SliverAppBar(

      backgroundColor: (isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight).withOpacity(0.8),

      elevation: 0,

      pinned: true,

      leading: IconButton(

        icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black),

        onPressed: () => Navigator.pop(context),

      ),

      title: const Text('Data Structures', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

      actions: [

        IconButton(icon: const Icon(Icons.share), onPressed: () {}),

        IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

      ],

    );

  }

  Widget _buildHeroSection(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Container(

        height: 200,

        decoration: BoxDecoration(

          borderRadius: BorderRadius.circular(16),

          image: const DecorationImage(

            image: NetworkImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'),

            fit: BoxFit.cover,

          ),

        ),

        child: Stack(

          children: [

            Container(

              decoration: BoxDecoration(

                borderRadius: BorderRadius.circular(16),

                gradient: LinearGradient(

                  begin: Alignment.topCenter,

                  end: Alignment.bottomCenter,

                  colors: [Colors.transparent, Colors.black.withOpacity(0.7)],

                ),

              ),

            ),

            Positioned(

              bottom: 16,

              left: 16,

              right: 16,

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  DecoratedBox(

                    decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.all(Radius.circular(4))),

                    child: Padding(

                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                      child: Text('ADVANCED', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),

                    ),

                  ),

                  SizedBox(height: 8),

                  Text(

                    'Mastering Data Structures & Algorithms',

                    style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),

                  ),

                ],

              ),

            ),

            Center(

              child: Container(

                width: 56,

                height: 56,

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.9), shape: BoxShape.circle),

                child: const Icon(Icons.play_arrow, color: Colors.white, size: 36),

              ),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildInstructorInfo(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Container(

        padding: const EdgeInsets.all(16),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(16),

          border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        ),

        child: Row(

          children: [

            const CircleAvatar(

              backgroundImage: NetworkImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'),

              radius: 28,

            ),

            const SizedBox(width: 16),

            const Expanded(

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('Dr. Sarah Jenkins', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                  Text('Senior CS Professor', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.w500)),

                ],

              ),

            ),

            Column(

              crossAxisAlignment: CrossAxisAlignment.end,

              children: [

                Row(

                  children: [

                    Icon(Icons.star, color: Colors.orange, size: 14),

                    SizedBox(width: 4),

                    Text('4.9', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                  ],

                ),

                Text('12k+ students', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              ],

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Container(

      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1)))),

      child: SingleChildScrollView(

        scrollDirection: Axis.horizontal,

        child: Row(

          children: [

            _buildTab('Overview', false),

            _buildTab('Modules', false),

            _buildTab('Resources', true),

            _buildTab('Students', false),

          ],

        ),

      ),

    );

  }

  Widget _buildTab(String label, bool active) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: active ? AppTheme.primary : Colors.transparent, width: 2))),

      child: Text(

        label,

        style: TextStyle(color: active ? AppTheme.primary : Colors.grey, fontWeight: active ? FontWeight.bold : FontWeight.w500, fontSize: 14),

      ),

    );

  }

  Widget _buildResourcesTab(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              Icon(Icons.folder_open, color: AppTheme.primary, size: 20),

              SizedBox(width: 8),

              Text('Course Materials', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            ],

          ),

          const SizedBox(height: 16),

          _buildResourceItem('Syllabus & Learning Path.pdf', '2.4 MB • Updated Oct 12', Icons.picture_as_pdf, Colors.red, isDark),

          const SizedBox(height: 12),

          _buildResourceItem('Big O Notation Explained.mp4', '45.2 MB • HD Quality', Icons.movie, Colors.blue, isDark),

          const SizedBox(height: 12),

          _buildResourceItem('Binary Search Trees Lab.zip', '1.1 MB • Source Code', Icons.folder_zip, Colors.amber, isDark),

          const SizedBox(height: 32),

          Row(

            children: [

              Icon(Icons.auto_stories, color: AppTheme.primary, size: 20),

              SizedBox(width: 8),

              Text('External Links', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            ],

          ),

          const SizedBox(height: 16),

          _buildExternalLink('Visualization Tool (VisuAlgo)', isDark),

          const SizedBox(height: 12),

          _buildExternalLink('LeetCode Patterns - Arrays', isDark),

        ],

      ),

    );

  }

  Widget _buildResourceItem(String title, String sub, IconData icon, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(12),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),

            child: Icon(icon, color: color, size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14), maxLines: 1, overflow: TextOverflow.ellipsis),

                Text(sub, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              ],

            ),

          ),

          IconButton(icon: const Icon(Icons.download, color: Colors.grey, size: 20), onPressed: () {}),

        ],

      ),

    );

  }

  Widget _buildExternalLink(String label, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.05),

        borderRadius: BorderRadius.circular(12),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              const Icon(Icons.link, color: AppTheme.primary, size: 20),

              const SizedBox(width: 12),

              Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

            ],

          ),

          const Icon(Icons.open_in_new, color: Colors.grey, size: 18),

        ],

      ),

    );

  }

  Widget _buildFloatingActionButton() {

    return Positioned(

      bottom: 24,

      right: 16,

      child: ElevatedButton.icon(

        onPressed: () {},

        icon: const Text('Resume Lesson', style: TextStyle(fontWeight: FontWeight.bold)),

        label: const Icon(Icons.arrow_forward, size: 20),

        style: ElevatedButton.styleFrom(

          backgroundColor: AppTheme.primary,

          foregroundColor: Colors.white,

          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),

          elevation: 8,

          shadowColor: AppTheme.primary.withOpacity(0.4),

        ),

      ),

    );

  }

}
