
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class JournalsResearchHubScreen extends StatelessWidget {

  const JournalsResearchHubScreen({super.key});

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

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    _buildCategories(isDark),

                    const SizedBox(height: 32),

                    _buildFeaturedResearch(context, isDark),

                    const SizedBox(height: 32),

                    _buildMyLibrary(isDark),

                    const SizedBox(height: 100),

                  ],

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 1), // Explore/Research index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Container(

      padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),

      child: Column(

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Row(

                children: [

                  Container(

                    padding: const EdgeInsets.all(8),

                    decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),

                    child: const Icon(Icons.menu_book, color: AppTheme.primary),

                  ),

                  const SizedBox(width: 12),

                  const Text(

                    'Journals & Research',

                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, letterSpacing: -0.5),

                  ),

                ],

              ),

              const CircleAvatar(

                radius: 20,

                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=a042581f4e29026704d'),

              ),

            ],

          ),

          const SizedBox(height: 20),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 16),

            decoration: BoxDecoration(

              color: isDark ? Color(0xFF0F172A) : Colors.white,

              borderRadius: BorderRadius.circular(16),

              boxShadow: [

                BoxShadow(

                  color: Colors.black.withOpacity(0.02),

                  blurRadius: 10,

                  offset: const Offset(0, 4),

                ),

              ],

            ),

            child: TextField(

              decoration: InputDecoration(

                hintText: 'Search papers, authors, or topics',

                hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),

                icon: Icon(Icons.search, color: Colors.grey[400]),

                border: InputBorder.none,

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildCategories(bool isDark) {

    final categories = [

      {'label': 'Engineering', 'icon': Icons.biotech},

      {'label': 'Medicine', 'icon': Icons.medical_services},

      {'label': 'Science', 'icon': Icons.science},

      {'label': 'Tech', 'icon': Icons.memory},

    ];

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Text('CATEGORIES', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),

              const Text('View All', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

            ],

          ),

        ),

        const SizedBox(height: 12),

        SingleChildScrollView(

          scrollDirection: Axis.horizontal,

          padding: const EdgeInsets.symmetric(horizontal: 24),

          child: Row(

            children: categories.map((cat) {

              bool isSelected = cat['label'] == 'Engineering';

              return Container(

                margin: const EdgeInsets.only(right: 12),

                height: 44,

                padding: const EdgeInsets.symmetric(horizontal: 20),

                decoration: BoxDecoration(

                  color: isSelected ? AppTheme.primary : (isDark ? Color(0xFF0F172A) : Colors.white),

                  borderRadius: BorderRadius.circular(14),

                  border: isSelected ? null : Border.all(color: Color(0xFF64748B).withOpacity(0.1)),

                  boxShadow: isSelected

                      ? [BoxShadow(color: AppTheme.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))]

                      : null,

                ),

                child: Row(

                  children: [

                    Icon(cat['icon'] as IconData, color: isSelected ? Colors.white : AppTheme.primary, size: 18),

                    const SizedBox(width: 8),

                    Text(

                      cat['label'] as String,

                      style: TextStyle(color: isSelected ? Colors.white : (isDark ? Colors.white : Colors.black87), fontWeight: FontWeight.bold, fontSize: 13),

                    ),

                  ],

                ),

              );

            }).toList(),

          ),

        ),

      ],

    );

  }

  Widget _buildFeaturedResearch(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('Featured Research', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

          const SizedBox(height: 16),

          GestureDetector(

            onTap: () => Navigator.pushNamed(context, '/research-paper-detail'),

            child: Container(

              height: 240,

              width: double.infinity,

              decoration: BoxDecoration(

                borderRadius: BorderRadius.circular(24),

                image: const DecorationImage(

                  image: NetworkImage('https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800'),

                  fit: BoxFit.cover,

                ),

              ),

              child: Container(

                decoration: BoxDecoration(

                  borderRadius: BorderRadius.circular(24),

                  gradient: LinearGradient(

                    begin: Alignment.topCenter,

                    end: Alignment.bottomCenter,

                    colors: [Colors.transparent, Colors.black.withOpacity(0.9)],

                  ),

                ),

                padding: const EdgeInsets.all(24),

                child: Column(

                  mainAxisAlignment: MainAxisAlignment.end,

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                      decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(6)),

                      child: const Text('EDITOR\'S CHOICE', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 1)),

                    ),

                    const SizedBox(height: 12),

                    const Text(

                      'Breakthroughs in CRISPR-Cas9 Gene Editing for Oncology',

                      style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold, height: 1.2),

                    ),

                    const SizedBox(height: 12),

                    Row(

                      children: [

                        const Icon(Icons.person, color: Colors.white70, size: 14),

                        const SizedBox(width: 4),

                        const Text('Dr. Elena Vance', style: TextStyle(color: Colors.white70, fontSize: 11)),

                        const SizedBox(width: 16),

                        const Icon(Icons.calendar_month, color: Colors.white70, size: 14),

                        const SizedBox(width: 4),

                        const Text('Oct 2023', style: TextStyle(color: Colors.white70, fontSize: 11)),

                      ],

                    ),

                  ],

                ),

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildMyLibrary(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('My Library', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

              Row(

                children: [

                  const Icon(Icons.sort, color: AppTheme.primary, size: 16),

                  const SizedBox(width: 4),

                  const Text('Recent', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.bold)),

                ],

              ),

            ],

          ),

          const SizedBox(height: 16),

          _LibraryItem(

            title: 'Neural Network Optimizations for Quantum Systems',

            journal: 'International Journal of Physics',

            status: 'PDF Available',

            imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200',

            isDark: isDark,

          ),

          _LibraryItem(

            title: 'Sustainable Materials in Civil Engineering: A 10-Year Review',

            journal: 'GreenTech Quarterly',

            status: 'Published Today',

            isPrimaryStatus: true,

            imageUrl: 'https://images.unsplash.com/photo-1466611653911-95282fc3656b?w=200',

            isDark: isDark,

          ),

          _LibraryItem(

            title: 'Algorithmic Bias in Healthcare AI: Mitigation Strategies',

            journal: 'Science & Society',

            status: 'Review Copy',

            imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?w=200',

            isDark: isDark,

          ),

        ],

      ),

    );

  }

}

class _LibraryItem extends StatelessWidget {

  final String title;

  final String journal;

  final String status;

  final String imageUrl;

  final bool isPrimaryStatus;

  final bool isDark;

  const _LibraryItem({

    required this.title,

    required this.journal,

    required this.status,

    required this.imageUrl,

    this.isPrimaryStatus = false,

    required this.isDark,

  });

  @override

  Widget build(BuildContext context) {

    return Container(

      margin: const EdgeInsets.only(bottom: 12),

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: Color(0xFF64748B).withOpacity(0.05)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 8,

            offset: const Offset(0, 2),

          ),

        ],

      ),

      child: Row(

        children: [

          ClipRRect(

            borderRadius: BorderRadius.circular(12),

            child: Image.network(imageUrl, width: 80, height: 100, fit: BoxFit.cover, opacity: const AlwaysStoppedAnimation(0.8)),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              mainAxisAlignment: MainAxisAlignment.spaceBetween,

              children: [

                Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(

                      title,

                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, height: 1.3),

                      maxLines: 2,

                      overflow: TextOverflow.ellipsis,

                    ),

                    const SizedBox(height: 4),

                    Text(journal, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                  ],

                ),

                const SizedBox(height: 12),

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                      decoration: BoxDecoration(

                        color: isPrimaryStatus ? AppTheme.primary.withOpacity(0.1) : (isDark ? Color(0xFF1E293B) : Color(0xFFF1F5F9)),

                        borderRadius: BorderRadius.circular(6),

                      ),

                      child: Text(

                        status,

                        style: TextStyle(

                          color: isPrimaryStatus ? AppTheme.primary : (isDark ? Colors.grey[400] : Colors.grey[600]),

                          fontSize: 9,

                          fontWeight: FontWeight.bold,

                        ),

                      ),

                    ),

                    const Icon(Icons.bookmark, color: AppTheme.primary, size: 18),

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
