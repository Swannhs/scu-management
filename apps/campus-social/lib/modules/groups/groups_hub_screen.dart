import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/components/navigation/bottom_nav.dart';
import 'package:campus_social/modules/groups/group_service.dart';

class GroupsHubScreen extends StatefulWidget {
  const GroupsHubScreen({super.key});

  @override
  State<GroupsHubScreen> createState() => _GroupsHubScreenState();
}

class _GroupsHubScreenState extends State<GroupsHubScreen> {
  final GroupService _groupService = GroupService();
  List<GroupModel> _myGroups = [];
  List<GroupModel> _suggestedGroups = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final my = await _groupService.getGroups();
    final suggested = await _groupService.getSuggestedGroups();
    setState(() {
      _myGroups = my.sublist(0, 3);
      _suggestedGroups = suggested;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),
      body: Stack(
        children: [
          SafeArea(
            child: Column(
              children: [
                _buildHeader(context, isDark),
                Expanded(
                  child: RefreshIndicator(
                    onRefresh: _loadData,
                    color: AppTheme.primary,
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildSearchBar(isDark),
                          _buildCategories(),
                          if (_isLoading)
                            const Padding(
                              padding: EdgeInsets.all(40),
                              child: Center(child: CircularProgressIndicator()),
                            )
                          else ...[
                            _buildMyGroups(context, isDark),
                            _buildSuggestedGroups(isDark),
                          ],
                          const SizedBox(height: 120),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            bottom: 110,
            right: 24,
            child: FloatingActionButton(
              onPressed: () => Navigator.pushNamed(context, '/create-group'),
              backgroundColor: AppTheme.primary,
              elevation: 4,
              child: const Icon(Icons.add_rounded, size: 30, color: Colors.white),
            ),
          ),
          const Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: BottomNav(currentIndex: 2), // Should define what index 2 is for
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context, bool isDark) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Groups Hub',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              fontFamily: 'Public Sans',
              color: isDark ? Colors.white : const Color(0xFF1B4D3E),
              letterSpacing: -0.5,
            ),
          ),
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () => Navigator.pushNamed(context, '/notifications'),
              ),
              const SizedBox(width: 8),
              const CircleAvatar(
                radius: 18,
                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user_me'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar(bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Container(
        height: 52,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.cardDark : Colors.white,
          borderRadius: BorderRadius.circular(16),
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
            Icon(Icons.search, color: Colors.grey[400], size: 22),
            const SizedBox(width: 12),
            Expanded(
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Find clubs, study groups...',
                  hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
                  border: InputBorder.none,
                ),
              ),
            ),
            Icon(Icons.tune, color: AppTheme.primary, size: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildCategories() {
    final categories = ['All', 'Academic', 'Social', 'Clubs', 'Sports'];
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: SizedBox(
        height: 38,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: categories.length,
          itemBuilder: (context, index) {
            bool isActive = index == 0;
            return Container(
              margin: const EdgeInsets.only(right: 10),
              padding: const EdgeInsets.symmetric(horizontal: 24),
              decoration: BoxDecoration(
                color: isActive ? AppTheme.primary : (Theme.of(context).brightness == Brightness.dark ? AppTheme.cardDark : Colors.white),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: isActive ? Colors.transparent : Colors.black.withValues(alpha: 0.05)),
              ),
              alignment: Alignment.center,
              child: Text(
                categories[index],
                style: TextStyle(
                  color: isActive ? Colors.white : Colors.grey[600],
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildMyGroups(BuildContext context, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 24, 20, 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'My Groups',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans'),
              ),
              Text(
                'View all',
                style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 140,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: _myGroups.length,
            itemBuilder: (context, index) {
              final group = _myGroups[index];
              return Container(
                width: 110,
                margin: const EdgeInsets.only(right: 16),
                child: Column(
                  children: [
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(24),
                        image: DecorationImage(image: NetworkImage(group.imageUrl), fit: BoxFit.cover),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      group.name,
                      textAlign: TextAlign.center,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSuggestedGroups(bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 24),
            child: Text(
              'Recommended for You',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans'),
            ),
          ),
          ..._suggestedGroups.map((group) => Container(
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.cardDark : Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.03),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                      child: Image.network(group.imageUrl, height: 160, width: double.infinity, fit: BoxFit.cover),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(group.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 17)),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    Icon(Icons.people_outline, size: 14, color: Colors.grey[500]),
                                    const SizedBox(width: 4),
                                    Text(
                                      '${group.memberCount} members • ${group.category}',
                                      style: TextStyle(color: Colors.grey[500], fontSize: 12),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.primary,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              elevation: 0,
                              minimumSize: const Size(80, 40),
                            ),
                            child: const Text('Join', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
