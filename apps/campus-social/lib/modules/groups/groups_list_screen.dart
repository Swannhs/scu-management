
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class GroupsListScreen extends StatelessWidget {

  const GroupsListScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: Stack(

        children: [

          SafeArea(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildHeader(context, isDark),

                _buildSearchBar(isDark),

                _buildCategories(),

                Expanded(

                  child: SingleChildScrollView(

                    child: Column(

                      crossAxisAlignment: CrossAxisAlignment.start,

                      children: [

                        _buildMyGroupsSection(context, isDark),

                        _buildDiscoverSection(isDark),

                        const SizedBox(height: 100),

                      ],

                    ),

                  ),

                ),

              ],

            ),

          ),

          Positioned(

            bottom: 100,

            right: 24,

            child: FloatingActionButton(

              onPressed: () => Navigator.pushNamed(context, '/create-group'),

              backgroundColor: AppTheme.primary,

              child: const Icon(Icons.add, size: 32, color: Colors.white),

            ),

          ),

          Positioned(

            bottom: 0,

            left: 0,

            right: 0,

            child: BottomNav(currentIndex: 2),

          ),

        ],

      ),

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          const Text(

            'Groups',

            style: TextStyle(

              fontSize: 24,

              fontWeight: FontWeight.bold,

              letterSpacing: -0.5,

            ),

          ),

          IconButton(

            icon: Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(

                color: isDark ? Color(0xFF1E293B) : Color(0xFFF1F5F9),

                shape: BoxShape.circle,

              ),

              child: Icon(Icons.notifications_none, size: 20, color: isDark ? Colors.grey[300] : Colors.grey[700]),

            ),

            onPressed: () => Navigator.pushNamed(context, '/notifications'),

          ),

        ],

      ),

    );

  }

  Widget _buildSearchBar(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),

      child: Container(

        height: 50,

        decoration: BoxDecoration(

          color: isDark ? Color(0xFF1E293B) : Color(0xFFF1F5F9),

          borderRadius: BorderRadius.circular(12),

        ),

        child: TextField(

          decoration: InputDecoration(

            hintText: 'Search groups, clubs, or batches',

            hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),

            prefixIcon: Icon(Icons.search, color: Colors.grey[400]),

            border: InputBorder.none,

            contentPadding: const EdgeInsets.symmetric(vertical: 15),

          ),

        ),

      ),

    );

  }

  Widget _buildCategories() {

    final categories = ['All', 'Academic', 'Clubs', 'Social'];

    return SizedBox(

      height: 40,

      child: ListView.builder(

        scrollDirection: Axis.horizontal,

        padding: const EdgeInsets.symmetric(horizontal: 24),

        itemCount: categories.length,

        itemBuilder: (context, index) {

          bool isActive = index == 0;

          return Padding(

            padding: const EdgeInsets.only(right: 8),

            child: Container(

              padding: const EdgeInsets.symmetric(horizontal: 20),

              decoration: BoxDecoration(

                color: isActive ? AppTheme.primary : (Theme.of(context).brightness == Brightness.dark ? Color(0xFF1E293B) : Color(0xFFF1F5F9)),

                borderRadius: BorderRadius.circular(8),

              ),

              alignment: Alignment.center,

              child: Text(

                categories[index],

                style: TextStyle(

                  color: isActive ? Colors.white : (Theme.of(context).brightness == Brightness.dark ? Colors.grey[300] : Colors.grey[700]),

                  fontWeight: isActive ? FontWeight.bold : FontWeight.w500,

                  fontSize: 13,

                ),

              ),

            ),

          );

        },

      ),

    );

  }

  Widget _buildMyGroupsSection(BuildContext context, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Padding(

          padding: const EdgeInsets.fromLTRB(24, 32, 24, 16),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text(

                'My Groups',

                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

              ),

              TextButton(

                onPressed: () {},

                child: const Text('See all', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

        ),

        _GroupListItem(

          name: 'CS Batch 2024',

          members: '128 Members • 3 new posts',

          img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',

        ),

        _GroupListItem(

          name: 'Design Society',

          members: '45 Members • 1 new post',

          img: 'https://images.unsplash.com/photo-1511108690759-0018d2f3334f?w=400',

        ),

      ],

    );

  }

  Widget _buildDiscoverSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Padding(

          padding: const EdgeInsets.fromLTRB(24, 32, 24, 16),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text(

                'Discover',

                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

              ),

              TextButton(

                onPressed: () {},

                child: const Text('Explore', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

        ),

        SizedBox(

          height: 180,

          child: ListView(

            scrollDirection: Axis.horizontal,

            padding: const EdgeInsets.symmetric(horizontal: 24),

            children: [

              _DiscoverCard(

                name: 'Robotics Club',

                members: '850 members here',

                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',

              ),

              _DiscoverCard(

                name: 'Campus Events',

                members: '2.4k members active',

                img: 'https://images.unsplash.com/photo-1540317580324-4c3e80931238?w=400',

              ),

              _DiscoverCard(

                name: 'StartUp Lab',

                members: '310 members active',

                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',

              ),

            ],

          ),

        ),

      ],

    );

  }

}

class _GroupListItem extends StatelessWidget {

  final String name;

  final String members;

  final String img;

  const _GroupListItem({

    required this.name,

    required this.members,

    required this.img,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),

      child: GestureDetector(

        onTap: () => Navigator.pushNamed(context, '/group-detail'),

        child: Container(

          padding: const EdgeInsets.all(12),

          decoration: BoxDecoration(

            color: isDark ? Color(0xFF0F172A)! : Colors.white,

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: isDark ? Color(0xFF1E293B)! : Color(0xFFF1F5F9)!),

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

                width: 56,

                height: 56,

                decoration: BoxDecoration(

                  borderRadius: BorderRadius.circular(12),

                  image: DecorationImage(

                    image: NetworkImage(img),

                    fit: BoxFit.cover,

                  ),

                ),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(

                      name,

                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),

                    ),

                    const SizedBox(height: 2),

                    Text(

                      members,

                      style: TextStyle(color: Colors.grey[500], fontSize: 12),

                    ),

                  ],

                ),

              ),

              Icon(Icons.chevron_right, color: Colors.grey[400]),

            ],

          ),

        ),

      ),

    );

  }

}

class _DiscoverCard extends StatelessWidget {

  final String name;

  final String members;

  final String img;

  const _DiscoverCard({

    required this.name,

    required this.members,

    required this.img,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      width: 160,

      margin: const EdgeInsets.only(right: 16),

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A)! : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: isDark ? Color(0xFF1E293B)! : Color(0xFFF1F5F9)!),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Container(

            width: 48,

            height: 48,

            decoration: BoxDecoration(

              shape: BoxShape.circle,

              image: DecorationImage(

                image: NetworkImage(img),

                fit: BoxFit.cover,

              ),

            ),

          ),

          const SizedBox(height: 12),

          Text(

            name,

            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

            maxLines: 1,

            overflow: TextOverflow.ellipsis,

          ),

          Text(

            members,

            style: TextStyle(color: Colors.grey[500], fontSize: 10),

            maxLines: 1,

            overflow: TextOverflow.ellipsis,

          ),

          const Spacer(),

          SizedBox(

            width: double.infinity,

            child: ElevatedButton(

              onPressed: () {},

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary.withOpacity(0.1),

                foregroundColor: AppTheme.primary,

                elevation: 0,

                shape: const StadiumBorder(),

                padding: const EdgeInsets.symmetric(vertical: 0),

              ).copyWith(

                minimumSize: WidgetStateProperty.all(const Size(0, 32)),

              ),

              child: const Text('Join', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

            ),

          ),

        ],

      ),

    );

  }

}
