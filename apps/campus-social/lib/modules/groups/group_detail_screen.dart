
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

import 'package:campus_social/components/cards/post_card.dart';

class GroupDetailScreen extends StatefulWidget {

  final String groupName;

  const GroupDetailScreen({super.key, this.groupName = 'Robotics Club'});

  @override

  State<GroupDetailScreen> createState() => _GroupDetailScreenState();

}

class _GroupDetailScreenState extends State<GroupDetailScreen> with SingleTickerProviderStateMixin {

  late TabController _tabController;

  @override

  void initState() {

    super.initState();

    _tabController = TabController(length: 4, vsync: this);

  }

  @override

  void dispose() {

    _tabController.dispose();

    super.dispose();

  }

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: NestedScrollView(

        headerSliverBuilder: (context, innerBoxIsScrolled) {

          return [

            _buildSliverAppBar(context, isDark),

            _buildSliverHeaderContent(isDark),

            SliverPersistentHeader(

              pinned: true,

              delegate: _SliverTabDelegate(

                TabBar(

                  controller: _tabController,

                  isScrollable: true,

                  labelColor: AppTheme.primary,

                  unselectedLabelColor: Colors.grey,

                  indicatorColor: AppTheme.primary,

                  indicatorWeight: 3,

                  labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

                  padding: const EdgeInsets.symmetric(horizontal: 16),

                  tabs: const [

                    Tab(text: 'Feed'),

                    Tab(text: 'Members'),

                    Tab(text: 'Events'),

                    Tab(text: 'Files'),

                  ],

                ),

                isDark,

              ),

            ),

          ];

        },

        body: TabBarView(

          controller: _tabController,

          children: [

            _buildFeedTab(isDark),

            _buildMembersTab(isDark),

            _buildEventsTab(isDark),

            Center(child: Text('Files Module Currently Empty')),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildSliverAppBar(BuildContext context, bool isDark) {

    return SliverAppBar(

      expandedHeight: 0,

      floating: true,

      pinned: true,

      elevation: 0,

       backgroundColor: isDark ? AppTheme.backgroundDark.withOpacity(0.9) : AppTheme.backgroundLight.withOpacity(0.9),

      leading: IconButton(

        icon: const Icon(Icons.arrow_back),

        onPressed: () => Navigator.pop(context),

      ),

      title: const Text('Group Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

      centerTitle: true,

      actions: [

        IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert)),

      ],

    );

  }

  Widget _buildSliverHeaderContent(bool isDark) {

    return SliverToBoxAdapter(

      child: Column(

        children: [

          Stack(

            clipBehavior: Clip.none,

            children: [

              Container(

                height: 180,

                width: double.infinity,

                decoration: BoxDecoration(

                  image: DecorationImage(

                    image: NetworkImage('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'),

                    fit: BoxFit.cover,

                  ),

                ),

              ),

              Positioned(

                bottom: -40,

                left: 16,

                child: Container(

                  width: 100,

                  height: 100,

                  decoration: BoxDecoration(

                    color: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

                    borderRadius: BorderRadius.circular(16),

                    border: Border.all(color: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight, width: 4),

                    image: const DecorationImage(

                      image: NetworkImage('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200'),

                      fit: BoxFit.cover,

                    ),

                    boxShadow: [

                      BoxShadow(

                        color: Colors.black.withOpacity(0.1),

                        blurRadius: 10,

                        offset: const Offset(0, 4),

                      ),

                    ],

                  ),

                ),

              ),

              Positioned(

                bottom: -32,

                right: 16,

                child: ElevatedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.check_circle, size: 16),

                  label: const Text('Joined'),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: AppTheme.primary.withOpacity(0.1),

                    foregroundColor: AppTheme.primary,

                    elevation: 0,

                    shape: const StadiumBorder(),

                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),

                  ).copyWith(

                    minimumSize: WidgetStateProperty.all(const Size(0, 40)),

                  ),

                ),

              ),

            ],

          ),

          const SizedBox(height: 50),

          Padding(

            padding: const EdgeInsets.symmetric(horizontal: 16),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(

                  widget.groupName,

                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),

                ),

                const SizedBox(height: 4),

                Row(

                  children: [

                    const Text(

                      '1,240 Members',

                      style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13),

                    ),

                    const SizedBox(width: 8),

                    const Text('•', style: TextStyle(color: Colors.grey)),

                    const SizedBox(width: 8),

                    Text(

                      'Public Group',

                      style: TextStyle(color: Colors.grey[500], fontSize: 13),

                    ),

                  ],

                ),

              ],

            ),

          ),

          const SizedBox(height: 16),

        ],

      ),

    );

  }

  Widget _buildFeedTab(bool isDark) {

    return SingleChildScrollView(

      padding: const EdgeInsets.all(16),

      child: Column(

        children: [

          _buildPostComposer(isDark),

          const SizedBox(height: 16),

          // In a real app, I'd update StandardPostCard to handle images, 

          // or create a GroupPostCard. For now using placeholder logic.

          const StandardPostCard(

            author: 'Alex Rivers',

            time: '2 hours ago',

            category: 'Tech',

            content: 'Just finished calibrating the new LIDAR sensors for our autonomous rover project. The precision is incredible compared to the old ultrasonic ones! 🤖🛰️',

            likes: 42,

            comments: 12,

            shares: 5,

          ),

          const SizedBox(height: 16),

          const StandardPostCard(

            author: 'Sarah Chen',

            time: '5 hours ago',

            category: 'Workshop',

            content: 'Is anyone interested in a weekend workshop on ROS2 fundamentals? I have some materials from the last conference I attended.',

            likes: 18,

            comments: 5,

            shares: 2,

          ),

          const SizedBox(height: 32),

        ],

      ),

    );

  }

  Widget _buildPostComposer(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF1E293B)?.withOpacity(0.5) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

      ),

      child: Column(

        children: [

          Row(

            children: [

              const CircleAvatar(

                radius: 20,

                backgroundColor: AppTheme.primary,

                child: Icon(Icons.person, color: Colors.white),

              ),

              const SizedBox(width: 12),

              Expanded(

                child: Container(

                  height: 40,

                  padding: const EdgeInsets.symmetric(horizontal: 16),

                  decoration: BoxDecoration(

                    color: isDark ? Color(0xFF0F172A) : Color(0xFFF1F5F9),

                    borderRadius: BorderRadius.circular(20),

                  ),

                  alignment: Alignment.centerLeft,

                  child: Text(

                    'Start a discussion...',

                    style: TextStyle(color: Colors.grey[500], fontSize: 13),

                  ),

                ),

              ),

            ],

          ),

          const SizedBox(height: 16),

          const Divider(height: 1, color: Color(0xFFF1F5F9)),

          const SizedBox(height: 12),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              _ComposerButton(icon: Icons.image, label: 'Photo', isDark: isDark),

              _ComposerButton(icon: Icons.videocam, label: 'Video', isDark: isDark),

              _ComposerButton(icon: Icons.event, label: 'Event', isDark: isDark),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildMembersTab(bool isDark) {

    // Simplified member list

    return ListView.builder(

      padding: const EdgeInsets.all(16),

      itemCount: 10,

      itemBuilder: (context, index) {

        return ListTile(

          leading: const CircleAvatar(backgroundImage: NetworkImage('https://i.pravatar.cc/100')),

          title: Text('Member ${index + 1}', style: const TextStyle(fontWeight: FontWeight.bold)),

          subtitle: const Text('CS Student • Batch 2024'),

          trailing: const Icon(Icons.chat_bubble_outline, size: 20, color: AppTheme.primary),

        );

      },

    );

  }

  Widget _buildEventsTab(bool isDark) {

    return ListView(

      padding: const EdgeInsets.all(16),

      children: [

        const EventPostCard(

          organizer: 'Robotics Club',

          time: 'Tomorrow, 5:00 PM',

          category: 'MEETING',

          title: 'Weekly Build Session',

          description: 'Hacking on the rover at the Innovation Lab. Snacks provided!',

          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',

          attendingCount: 24,

        ),

        const SizedBox(height: 16),

        const EventPostCard(

          organizer: 'Sarah Chen',

          time: 'Sat, 10:00 AM',

          category: 'WORKSHOP',

          title: 'ROS2 Fundamentals',

          description: 'A deep dive into the Robot Operating System for beginners.',

          imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',

          attendingCount: 15,

        ),

      ],

    );

  }

}

class _SliverTabDelegate extends SliverPersistentHeaderDelegate {

  final TabBar tabBar;

  final bool isDark;

  _SliverTabDelegate(this.tabBar, this.isDark);

  @override

  double get minExtent => tabBar.preferredSize.height;

  @override

  double get maxExtent => tabBar.preferredSize.height;

  @override

  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {

    return Container(

      color: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      child: tabBar,

    );

  }

  @override

  bool shouldRebuild(_SliverTabDelegate oldDelegate) => false;

}

class _ComposerButton extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isDark;

  const _ComposerButton({required this.icon, required this.label, required this.isDark});

  @override

  Widget build(BuildContext context) {

    return TextButton.icon(

      onPressed: () {},

      icon: Icon(icon, color: AppTheme.primary, size: 18),

      label: Text(

        label,

        style: TextStyle(

          color: isDark ? Colors.grey[400] : Colors.grey[600],

          fontSize: 12,

          fontWeight: FontWeight.bold,

        ),

      ),

      style: TextButton.styleFrom(

        padding: const EdgeInsets.symmetric(horizontal: 12),

      ),

    );

  }

}
