
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class GroupManagementScreen extends StatefulWidget {

  const GroupManagementScreen({super.key});

  @override

  State<GroupManagementScreen> createState() => _GroupManagementScreenState();

}

class _GroupManagementScreenState extends State<GroupManagementScreen> with SingleTickerProviderStateMixin {

  late TabController _tabController;

  @override

  void initState() {

    super.initState();

    _tabController = TabController(length: 2, vsync: this);

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

      appBar: AppBar(

        backgroundColor: Colors.transparent,

        elevation: 0,

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () => Navigator.pop(context),

        ),

        title: const Text('Group Management', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        centerTitle: true,

        actions: [

          IconButton(onPressed: () {}, icon: const Icon(Icons.settings_outlined)),

        ],

      ),

      body: Column(

        children: [

          _buildSearchBar(isDark),

          _buildTabs(isDark),

          Expanded(

            child: TabBarView(

              controller: _tabController,

              children: [

                _buildMembersTab(isDark),

                _buildRequestsTab(isDark),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildSearchBar(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Container(

        height: 48,

        decoration: BoxDecoration(

          color: AppTheme.primary.withOpacity(0.1),

          borderRadius: BorderRadius.circular(12),

        ),

        child: TextField(

          decoration: InputDecoration(

            hintText: 'Find specific members',

            hintStyle: TextStyle(color: AppTheme.primary.withOpacity(0.6), fontSize: 14),

            prefixIcon: const Icon(Icons.search, color: AppTheme.primary),

            border: InputBorder.none,

            contentPadding: const EdgeInsets.symmetric(vertical: 12),

          ),

        ),

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return TabBar(

      controller: _tabController,

      labelColor: AppTheme.primary,

      unselectedLabelColor: Colors.grey,

      indicatorColor: AppTheme.primary,

      indicatorWeight: 3,

      tabs: const [

        Tab(text: 'Members'),

        Tab(text: 'Join Requests (8)'),

      ],

    );

  }

  Widget _buildMembersTab(bool isDark) {

    final members = [

      {'name': 'Alex Johnson', 'role': 'Admin', 'dept': 'Computer Science Senior'},

      {'name': 'Sarah Chen', 'role': 'Moderator', 'dept': 'Design & Innovation'},

      {'name': 'Marcus Williams', 'role': 'Member', 'dept': 'Business Administration'},

    ];

    return ListView.builder(

      padding: const EdgeInsets.symmetric(vertical: 8),

      itemCount: members.length,

      itemBuilder: (context, index) {

        final m = members[index];

        return ListTile(

          leading: const CircleAvatar(backgroundImage: NetworkImage('https://i.pravatar.cc/100')),

          title: Text(m['name']!, style: const TextStyle(fontWeight: FontWeight.bold)),

          subtitle: Text(m['dept']!, style: TextStyle(color: Colors.grey[500], fontSize: 13)),

          trailing: Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

            child: Text(m['role']!, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 10)),

          ),

        );

      },

    );

  }

  Widget _buildRequestsTab(bool isDark) {

    final requests = [

       {'name': 'Elena Rodriguez', 'dept': 'Bioengineering Junior'},

       {'name': 'Kevin Smith', 'dept': 'Psychology Sophomore'},

    ];

    return ListView.builder(

      padding: const EdgeInsets.all(16),

      itemCount: requests.length,

      itemBuilder: (context, index) {

        final r = requests[index];

        return Container(

          margin: const EdgeInsets.only(bottom: 16),

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(

            color: isDark ? Color(0xFF1E293B)?.withOpacity(0.5) : Colors.white,

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

          ),

          child: Column(

            children: [

              Row(

                children: [

                  const CircleAvatar(backgroundImage: NetworkImage('https://i.pravatar.cc/100')),

                  const SizedBox(width: 12),

                  Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text(r['name']!, style: const TextStyle(fontWeight: FontWeight.bold)),

                      Text(r['dept']!, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                    ],

                  ),

                ],

              ),

              const SizedBox(height: 16),

              Row(

                children: [

                  Expanded(

                    child: ElevatedButton(

                      onPressed: () {},

                      style: ElevatedButton.styleFrom(

                        backgroundColor: AppTheme.primary,

                        foregroundColor: Colors.white,

                        elevation: 0,

                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                      ),

                      child: const Text('Approve', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                    ),

                  ),

                  const SizedBox(width: 12),

                  Expanded(

                    child: ElevatedButton(

                      onPressed: () {},

                      style: ElevatedButton.styleFrom(

                        backgroundColor: AppTheme.primary.withOpacity(0.1),

                        foregroundColor: AppTheme.primary,

                        elevation: 0,

                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                      ),

                      child: const Text('Reject', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                    ),

                  ),

                ],

              ),

            ],

          ),

        );

      },

    );

  }

}
