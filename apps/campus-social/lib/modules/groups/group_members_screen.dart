
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class GroupMembersScreen extends StatelessWidget {

  const GroupMembersScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            _buildSearchBar(isDark),

            Expanded(

              child: ListView(

                padding: const EdgeInsets.symmetric(horizontal: 16),

                children: [

                  _buildSectionTitle('Admins (3)', isDark),

                  _buildMemberItem('Alex Rivet', 'President', true, isDark),

                  _buildMemberItem('Sarah Chen', 'Tech Lead', false, isDark),

                  _buildMemberItem('Marcus Jordan', 'Operations', false, isDark),

                  const SizedBox(height: 24),

                  _buildSectionTitle('Members (12)', isDark),

                  _buildMemberItem('David Miller', 'Senior Developer', false, isDark, isSimple: true),

                  _buildMemberItem('Elena Rodriguez', 'Junior (Electronics)', false, isDark, isSimple: true),

                  _buildMemberItem('James Wilson', 'Senior (Mechanical)', false, isDark, isSimple: true),

                  _buildMemberItem('Lila Thorne', 'AI Specialist', false, isDark, isSimple: true),

                  const SizedBox(height: 100),

                ],

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.arrow_back)),

              const Text('Members', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),

            ],

          ),

          IconButton(

            onPressed: () {},

            icon: Icon(Icons.person_add, color: AppTheme.primary),

            style: IconButton.styleFrom(backgroundColor: AppTheme.primary.withOpacity(0.1)),

          ),

        ],

      ),

    );

  }

  Widget _buildSearchBar(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Container(

        height: 52,

        decoration: BoxDecoration(

          color: AppTheme.primary.withOpacity(0.05),

          borderRadius: BorderRadius.circular(16),

          border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        ),

        child: const TextField(

          decoration: InputDecoration(

            hintText: 'Search members by name or role',

            prefixIcon: Icon(Icons.search, color: AppTheme.primary),

            border: InputBorder.none,

            contentPadding: EdgeInsets.symmetric(vertical: 14),

          ),

        ),

      ),

    );

  }

  Widget _buildSectionTitle(String title, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Text(title.toUpperCase(), style: TextStyle(color: isDark ? Colors.grey[400] : Colors.grey[600], fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.2)),

    );

  }

  Widget _buildMemberItem(String name, String role, bool isOnline, bool isDark, {bool isSimple = false}) {

    return ListTile(

      contentPadding: EdgeInsets.zero,

      leading: Stack(

        children: [

          Container(

            width: 56,

            height: 56,

            decoration: BoxDecoration(

              shape: BoxShape.circle,

              border: Border.all(color: AppTheme.primary.withOpacity(0.2), width: 2),

              image: const DecorationImage(image: NetworkImage('https://i.pravatar.cc/100')),

            ),

          ),

          if (isOnline)

            Positioned(

              bottom: 2,

              right: 2,

              child: Container(

                width: 14,

                height: 14,

                decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),

              ),

            ),

        ],

      ),

      title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),

      subtitle: Text(role, style: TextStyle(color: isSimple ? Colors.grey : AppTheme.primary, fontWeight: isSimple ? FontWeight.normal : FontWeight.bold, fontSize: 13)),

      trailing: isSimple

          ? ElevatedButton(

              onPressed: () {},

              style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primary.withOpacity(0.1), foregroundColor: AppTheme.primary, elevation: 0, shape: const StadiumBorder()),

              child: const Text('Message', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),

            )

          : Container(

              width: 40,

              height: 40,

              decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(20), boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.2), blurRadius: 8, offset: const Offset(0, 4))]),

              child: const Icon(Icons.chat_bubble, color: Colors.white, size: 18),

            ),

    );

  }

}
