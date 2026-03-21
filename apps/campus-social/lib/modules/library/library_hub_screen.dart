
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class LibraryHubScreen extends StatelessWidget {

  const LibraryHubScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildHeader(context, isDark),

              _buildSearchBar(isDark),

              _buildCategories(isDark),

              _buildMyBorrowed(context, isDark),

              _buildRecommended(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Using Groups index for now or custom

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: Icon(Icons.menu, color: isDark ? Colors.white70 : Colors.black87),

            onPressed: () {},

          ),

          const Text(

            'Digital Library',

            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

          ),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: const Text(

              'CS MAJOR',

              style: TextStyle(

                color: AppTheme.primary,

                fontSize: 10,

                fontWeight: FontWeight.bold,

                letterSpacing: 1,

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildSearchBar(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Container(

        padding: const EdgeInsets.symmetric(horizontal: 16),

        decoration: BoxDecoration(

          color: AppTheme.primary.withOpacity(0.05),

          borderRadius: BorderRadius.circular(16),

        ),

        child: const TextField(

          decoration: InputDecoration(

            hintText: 'Search books, papers, or authors',

            icon: Icon(Icons.search, color: AppTheme.primary),

            border: InputBorder.none,

          ),

        ),

      ),

    );

  }

  Widget _buildCategories(bool isDark) {

    final categories = [

      {'icon': Icons.auto_stories, 'label': 'E-books', 'active': true},

      {'icon': Icons.science, 'label': 'Research', 'active': false},

      {'icon': Icons.inventory_2, 'label': 'Course Material', 'active': false},

    ];

    return SizedBox(

      height: 70,

      child: ListView.builder(

        scrollDirection: Axis.horizontal,

        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

        itemCount: categories.length,

        itemBuilder: (context, index) {

          final cat = categories[index];

          bool active = cat['active'] as bool;

          return Container(

            margin: const EdgeInsets.only(right: 12),

            padding: const EdgeInsets.symmetric(horizontal: 16),

            decoration: BoxDecoration(

              color: active ? AppTheme.primary : (isDark ? Color(0xFF1E293B) : Colors.white),

              borderRadius: BorderRadius.circular(12),

              border: active ? null : Border.all(color: Colors.grey.withOpacity(0.2)),

              boxShadow: active ? [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 4))] : null,

            ),

            child: Row(

              children: [

                Icon(cat['icon'] as IconData, color: active ? Colors.white : AppTheme.primary, size: 18),

                const SizedBox(width: 8),

                Text(

                  cat['label'] as String,

                  style: TextStyle(

                    color: active ? Colors.white : (isDark ? Colors.white70 : Colors.black87),

                    fontWeight: FontWeight.bold,

                    fontSize: 13,

                  ),

                ),

              ],

            ),

          );

        },

      ),

    );

  }

  Widget _buildMyBorrowed(BuildContext context, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Padding(

          padding: const EdgeInsets.fromLTRB(16, 24, 16, 12),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('My Borrowed', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

              TextButton(

                onPressed: () => Navigator.pushNamed(context, '/borrowed-books'),

                child: const Text('View All', style: TextStyle(color: AppTheme.primary)),

              ),

            ],

          ),

        ),

        SizedBox(

          height: 120,

          child: ListView(

            scrollDirection: Axis.horizontal,

            padding: const EdgeInsets.symmetric(horizontal: 16),

            children: [

              _buildBorrowedCard(

                'Algorithms 4th Ed',

                'Due in 3 days',

                0.66,

                'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',

                isDark,

              ),

              _buildBorrowedCard(

                'Discrete Mathematics',

                'Due in 12 days',

                0.25,

                'https://images.unsplash.com/photo-1511108690759-0018d2f3334f?w=400',

                isDark,

              ),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildBorrowedCard(String title, String due, double progress, String img, bool isDark) {

    return Container(

      width: 280,

      margin: const EdgeInsets.only(right: 16),

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          ClipRRect(

            borderRadius: BorderRadius.circular(8),

            child: Image.network(img, width: 60, height: 80, fit: BoxFit.cover),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14), maxLines: 1, overflow: TextOverflow.ellipsis),

                const SizedBox(height: 4),

                Text(due, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                const SizedBox(height: 8),

                LinearProgressIndicator(

                  value: progress,

                  backgroundColor: Colors.grey.withOpacity(0.1),

                  valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.primary),

                  borderRadius: BorderRadius.circular(4),

                  minHeight: 6,

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildRecommended(BuildContext context, bool isDark) {

    final books = [

      {

        'title': 'Intro to Cyber Security',

        'author': 'Dr. Alan Turing',

        'rating': '4.8',

        'img': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'

      },

      {

        'title': 'Neural Networks',

        'author': 'S. Russell',

        'rating': '4.9',

        'img': 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=400'

      },

      {

        'title': 'Database Systems',

        'author': 'A. Silberschatz',

        'rating': '4.7',

        'img': 'https://images.unsplash.com/photo-1544383335-c533fd093223?w=400'

      },

      {

        'title': 'Compiler Design',

        'author': 'Alfred Aho',

        'rating': '4.5',

        'img': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'

      },

    ];

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Padding(

            padding: const EdgeInsets.symmetric(vertical: 20),

            child: Row(

              mainAxisAlignment: MainAxisAlignment.spaceBetween,

              children: [

                const Text('Recommended for CS', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

                TextButton(onPressed: () {}, child: const Text('Refresh', style: TextStyle(color: AppTheme.primary))),

              ],

            ),

          ),

          GridView.builder(

            shrinkWrap: true,

            physics: const NeverScrollableScrollPhysics(),

            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(

              crossAxisCount: 2,

              childAspectRatio: 0.65,

              crossAxisSpacing: 16,

              mainAxisSpacing: 16,

            ),

            itemCount: books.length,

            itemBuilder: (context, index) {

              final book = books[index];

              return _buildBookCard(context, book, isDark);

            },

          ),

        ],

      ),

    );

  }

  Widget _buildBookCard(BuildContext context, Map<String, String> book, bool isDark) {

    return GestureDetector(

      onTap: () => Navigator.pushNamed(context, '/book-detail'),

      child: Container(

        decoration: BoxDecoration(

          color: isDark ? Color(0xFF1E293B) : Colors.white,

          borderRadius: BorderRadius.circular(16),

          border: Border.all(color: Colors.grey.withOpacity(0.1)),

          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

        ),

        padding: const EdgeInsets.all(8),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Expanded(

              child: Stack(

                children: [

                  ClipRRect(

                    borderRadius: BorderRadius.circular(12),

                    child: Image.network(book['img']!, width: double.infinity, height: double.infinity, fit: BoxFit.cover),

                  ),

                  Positioned(

                    top: 8,

                    right: 8,

                    child: CircleAvatar(

                      backgroundColor: Colors.white.withOpacity(0.9),

                      radius: 14,

                      child: const Icon(Icons.bookmark, color: AppTheme.primary, size: 16),

                    ),

                  ),

                ],

              ),

            ),

            const SizedBox(height: 8),

            Text(book['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), maxLines: 1, overflow: TextOverflow.ellipsis),

            Text(book['author']!, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

            const SizedBox(height: 8),

            Row(

              mainAxisAlignment: MainAxisAlignment.spaceBetween,

              children: [

                Text('★ ${book['rating']}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

                Container(

                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                  decoration: BoxDecoration(

                    color: AppTheme.primary.withOpacity(0.1),

                    borderRadius: BorderRadius.circular(6),

                  ),

                  child: const Text('BORROW', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

                ),

              ],

            ),

          ],

        ),

      ),

    );

  }

}
