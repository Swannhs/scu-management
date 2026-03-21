
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ResearchPaperDetailScreen extends StatelessWidget {

  const ResearchPaperDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            Expanded(

              child: SingleChildScrollView(

                child: Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildCategoryBadge(),

                      const SizedBox(height: 12),

                      const Text(

                        'Deep Learning in Robotics: A Comprehensive Survey of Recent Advancements',

                        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, height: 1.2),

                      ),

                      const SizedBox(height: 24),

                      _buildAuthorsSection(isDark),

                      const SizedBox(height: 24),

                      _buildQuickStats(isDark),

                      const SizedBox(height: 32),

                      _buildAbstract(isDark),

                      const SizedBox(height: 32),

                      _buildPdfPreview(isDark),

                      const SizedBox(height: 32),

                      _buildActionButtons(isDark),

                      const SizedBox(height: 100),

                    ],

                  ),

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Academic index

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      decoration: BoxDecoration(

        border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: const Icon(Icons.arrow_back),

            onPressed: () => Navigator.pop(context),

          ),

          const Text(

            'Paper Details',

            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),

          ),

          IconButton(

            icon: const Icon(Icons.more_vert),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

  Widget _buildCategoryBadge() {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.1),

        borderRadius: BorderRadius.circular(20),

      ),

      child: const Text(

        'Computer Science & Robotics',

        style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),

      ),

    );

  }

  Widget _buildAuthorsSection(bool isDark) {

    return Row(

      children: [

        SizedBox(

          width: 60,

          child: Stack(

            children: [

              const CircleAvatar(radius: 20, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=jane')),

              Positioned(

                left: 20,

                child: CircleAvatar(radius: 20, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alan')),

              ),

            ],

          ),

        ),

        const SizedBox(width: 8),

        Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('Dr. Jane Smith, Prof. Alan Turing', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

              Text('Published on Oct 12, 2023 • 12 min read', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildQuickStats(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 16),

      decoration: BoxDecoration(

        border: Border.symmetric(horizontal: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildStatItem('1.2k', 'Citations'),

          Container(width: 1, height: 24, color: AppTheme.primary.withOpacity(0.1)),

          _buildStatItem('458', 'Saves'),

          Container(width: 1, height: 24, color: AppTheme.primary.withOpacity(0.1)),

          _buildStatItem('8.4k', 'Views'),

        ],

      ),

    );

  }

  Widget _buildStatItem(String value, String label) {

    return Column(

      children: [

        Text(value, style: const TextStyle(color: AppTheme.primary, fontSize: 18, fontWeight: FontWeight.bold)),

        Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

      ],

    );

  }

  Widget _buildAbstract(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Abstract', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        const SizedBox(height: 8),

        Text(

          "This research paper explores the transformative impact of deep learning architectures on contemporary robotics. We analyze the shift from classical control theory to end-to-end neural network approaches in motion planning, computer vision, and tactile sensing. The study provides a comprehensive overview of reinforcement learning techniques applied to complex manipulation tasks and high-dimensional state spaces. We further discuss the challenges of sim-to-real transfer and the future of self-supervised learning in autonomous systems. By synthesizing results from over 200 recent experiments, this survey aims to provide a roadmap for researchers in the field.",

          style: TextStyle(color: Colors.grey[600], fontSize: 14, height: 1.6),

          maxLines: 4,

          overflow: TextOverflow.ellipsis,

        ),

        TextButton.icon(

          onPressed: () {},

          icon: const Text('Show more', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

          label: const Icon(Icons.expand_more, size: 18, color: AppTheme.primary),

          style: TextButton.styleFrom(padding: EdgeInsets.zero),

        ),

      ],

    );

  }

  Widget _buildPdfPreview(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

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

          Container(

            height: 180,

            width: double.infinity,

            decoration: BoxDecoration(

              color: isDark ? Color(0xFF0F172A) : Color(0xFFF8FAFC),

              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),

            ),

            child: Column(

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                Icon(Icons.description, size: 64, color: AppTheme.primary.withOpacity(0.3)),

                const SizedBox(height: 12),

                Text('PDF Preview - First 2 pages available', style: TextStyle(color: Colors.grey[400], fontSize: 12, fontStyle: FontStyle.italic)),

              ],

            ),

          ),

          Padding(

            padding: const EdgeInsets.all(16.0),

            child: ElevatedButton.icon(

              onPressed: () {},

              icon: const Icon(Icons.menu_book),

              label: const Text('Read Full Paper', style: TextStyle(fontWeight: FontWeight.bold)),

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary,

                foregroundColor: Colors.white,

                minimumSize: const Size(double.infinity, 56),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildActionButtons(bool isDark) {

    return Row(

      children: [

        _ActionButton('Cite', Icons.format_quote, isDark),

        const SizedBox(width: 12),

        _ActionButton('Save', Icons.bookmark_border, isDark),

        const SizedBox(width: 12),

        _ActionButton('Share', Icons.share_outlined, isDark),

      ],

    );

  }

  Widget _ActionButton(String label, IconData icon, bool isDark) {

    return Expanded(

      child: Container(

        padding: const EdgeInsets.symmetric(vertical: 16),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(16),

          border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        ),

        child: Column(

          children: [

            Icon(icon, color: AppTheme.primary, size: 24),

            const SizedBox(height: 8),

            Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

          ],

        ),

      ),

    );

  }

}
