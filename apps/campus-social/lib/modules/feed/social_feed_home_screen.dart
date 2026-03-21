import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/components/navigation/bottom_nav.dart';
import 'package:campus_social/components/cards/social_post_card.dart';
import 'package:campus_social/modules/feed/feed_service.dart';
import 'package:campus_social/modules/feed/create_post_screen.dart';
import 'package:campus_social/modules/feed/post_detail_screen.dart';

class SocialFeedHomeScreen extends StatefulWidget {
  const SocialFeedHomeScreen({super.key});

  @override
  State<SocialFeedHomeScreen> createState() => _SocialFeedHomeScreenState();
}

class _SocialFeedHomeScreenState extends State<SocialFeedHomeScreen> {
  final FeedService _feedService = FeedService();
  final ScrollController _scrollController = ScrollController();
  List<PostModel> _posts = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadFeed();
  }

  Future<void> _loadFeed() async {
    setState(() => _isLoading = true);
    final posts = await _feedService.getFeedPosts();
    setState(() {
      _posts = posts;
      _isLoading = false;
    });
  }

  void _navigateToCreate() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const CreatePostScreen()),
    ).then((_) => _loadFeed());
  }

  void _navigateToDetail(PostModel post) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const PostDetailScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),
      body: RefreshIndicator(
        onRefresh: _loadFeed,
        color: AppTheme.primary,
        child: CustomScrollView(
          controller: _scrollController,
          slivers: [
            _buildAppBar(isDark),
            SliverToBoxAdapter(child: _buildPostComposerEntry(isDark)),
            SliverToBoxAdapter(child: _buildFilterPills(isDark)),
            if (_isLoading && _posts.isEmpty)
              const SliverFillRemaining(
                child: Center(child: CircularProgressIndicator()),
              )
            else
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final post = _posts[index];
                    return SocialPostCard(
                      type: post.type,
                      authorName: post.authorName,
                      authorRole: post.authorRole,
                      time: post.time,
                      content: post.content,
                      imageUrls: post.imageUrls,
                      likes: post.likes,
                      comments: post.comments,
                      isOfficial: post.isOfficial,
                      eventTitle: post.id == '1' ? 'Spring Gala 2024' : null,
                      eventBadge: post.id == '1' ? 'FEATURED' : null,
                      onTap: () => _navigateToDetail(post),
                    );
                  },
                  childCount: _posts.length,
                ),
              ),
            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateToCreate,
        backgroundColor: AppTheme.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      bottomNavigationBar: const BottomNav(currentIndex: 0),
    );
  }

  Widget _buildAppBar(bool isDark) {
    return SliverAppBar(
      floating: true,
      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,
      elevation: 0,
      centerTitle: false,
      title: Text(
        'Campus Social',
        style: TextStyle(
          fontWeight: FontWeight.w900,
          color: AppTheme.primary,
          fontSize: 22,
          letterSpacing: -0.5,
        ),
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.notifications_outlined, color: Colors.grey[600]),
          onPressed: () {},
        ),
        IconButton(
          icon: Icon(Icons.search, color: Colors.grey[600]),
          onPressed: () {},
        ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildPostComposerEntry(bool isDark) {
    return GestureDetector(
      onTap: _navigateToCreate,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.cardDark : Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            const CircleAvatar(
              radius: 18,
              backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user_me'),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'What\'s happening on campus?',
                style: TextStyle(color: Colors.grey[500], fontSize: 14),
              ),
            ),
            Icon(Icons.image_outlined, color: AppTheme.primary, size: 22),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterPills(bool isDark) {
    final filters = ['All', 'Academic', 'Clubs', 'Jobs', 'Events'];
    return Column(
      children: [
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: filters.map((f) => _buildFilterPill(f, f == 'All')).toList(),
          ),
        ),
        const SizedBox(height: 10),
      ],
    );
  }

  Widget _buildFilterPill(String label, bool isSelected) {
    return Container(
      margin: const EdgeInsets.only(right: 10),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: isSelected ? AppTheme.primary : (Theme.of(context).brightness == Brightness.dark ? AppTheme.cardDark : Colors.white),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isSelected ? Colors.transparent : Colors.black.withValues(alpha: 0.05),
        ),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: isSelected ? Colors.white : Colors.grey[600],
          fontSize: 13,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
