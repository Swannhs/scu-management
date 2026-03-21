
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherManageOpportunitiesScreen extends StatelessWidget {

  const TeacherManageOpportunitiesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('EduServe', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        actions: [

          Padding(

            padding: const EdgeInsets.only(right: 16.0),

            child: CircleAvatar(

              radius: 18,

              backgroundColor: Colors.amber[100],

              child: const Icon(Icons.person, color: Colors.amber, size: 20),

            ),

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Padding(

            padding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 8),

            child: Text('Manage Opportunities', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          ),

          const SizedBox(height: 16),

          _buildTabs(isDark),

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(24),

              children: [

                _buildOpportunityCard(

                  'Community Garden Restoration',

                  'ACTIVE',

                  'Oct 24, 2023',

                  '12 / 25',

                  '4 Pending',

                  true,

                  isDark,

                ),

                const SizedBox(height: 24),

                _buildOpportunityCard(

                  'Local Literacy Program Tutoring',

                  'RECRUITING',

                  'Nov 02, 2023',

                  '8 / 10',

                  '0 Pending',

                  false,

                  isDark,

                ),

              ],

            ),

          ),

        ],

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () => Navigator.pushNamed(context, '/teacher-create-opportunity'),

        backgroundColor: const Color(0xFF006D44),

        child: const Icon(Icons.add, color: Colors.white, size: 32),

      ),

      bottomNavigationBar: _buildTeacherBottomNav(isDark),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Container(

      margin: const EdgeInsets.symmetric(horizontal: 24),

      padding: const EdgeInsets.all(4),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[200]!.withOpacity(0.5),

        borderRadius: BorderRadius.circular(12),

      ),

      child: Row(

        children: [

          Expanded(child: _buildTab('Active', true, isDark)),

          Expanded(child: _buildTab('Drafts', false, isDark)),

          Expanded(child: _buildTab('Closed', false, isDark)),

        ],

      ),

    );

  }

  Widget _buildTab(String label, bool isSelected, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 12),

      decoration: BoxDecoration(

        color: isSelected ? (isDark ? AppTheme.primary : Colors.white) : Colors.transparent,

        borderRadius: BorderRadius.circular(8),

        boxShadow: isSelected && !isDark ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2))] : null,

      ),

      child: Text(

        label,

        textAlign: TextAlign.center,

        style: TextStyle(

          color: isSelected ? (isDark ? Colors.white : AppTheme.primary) : Colors.grey[600],

          fontWeight: FontWeight.bold,

          fontSize: 14,

        ),

      ),

    );

  }

  Widget _buildOpportunityCard(

    String title,

    String status,

    String date,

    String volunteers,

    String applications,

    bool hasPending,

    bool isDark,

  ) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: const Color(0xFFC0F2D8), borderRadius: BorderRadius.circular(8)),

                child: Text(status, style: const TextStyle(color: Color(0xFF007A5E), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

              ),

              Row(

                children: [

                  const Icon(Icons.calendar_today_outlined, size: 12, color: Colors.grey),

                  const SizedBox(width: 4),

                  Text(date, style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                ],

              ),

            ],

          ),

          const SizedBox(height: 16),

          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          const SizedBox(height: 20),

          Row(

            children: [

              Expanded(child: _buildStatBox('VOLUNTEERS', volunteers, 'joined', Colors.blueGrey[50]!, Colors.blueGrey, false)),

              const SizedBox(width: 12),

              Expanded(child: _buildStatBox('APPLICATIONS', applications.split(' ')[0], applications.split(' ')[1], hasPending ? Colors.red[50]! : Colors.grey[100]!, hasPending ? Colors.red : Colors.grey, hasPending)),

            ],

          ),

          const SizedBox(height: 24),

          Row(

            children: [

              Expanded(

                flex: 3,

                child: ElevatedButton(

                  onPressed: () {},

                  style: ElevatedButton.styleFrom(

                    backgroundColor: const Color(0xFF008D58),

                    foregroundColor: Colors.white,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                    padding: const EdgeInsets.symmetric(vertical: 14),

                    elevation: 0,

                  ),

                  child: const Text('View Details', style: TextStyle(fontWeight: FontWeight.bold)),

                ),

              ),

              const SizedBox(width: 12),

              Expanded(

                child: OutlinedButton(

                  onPressed: () {},

                  style: OutlinedButton.styleFrom(

                    foregroundColor: Colors.grey[600],

                    side: BorderSide(color: Colors.grey[200]!),

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                    padding: const EdgeInsets.symmetric(vertical: 14),

                  ),

                  child: const Text('Edit', style: TextStyle(fontWeight: FontWeight.bold)),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildStatBox(String label, String value, String unit, Color bg, Color fg, bool highlight) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12)),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text(label, style: TextStyle(color: fg.withOpacity(0.7), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          const SizedBox(height: 4),

          Row(

            crossAxisAlignment: CrossAxisAlignment.baseline,

            textBaseline: TextBaseline.alphabetic,

            children: [

              Text(value, style: TextStyle(color: fg, fontSize: 16, fontWeight: FontWeight.bold)),

              const SizedBox(width: 4),

              Text(unit, style: TextStyle(color: fg.withOpacity(0.6), fontSize: 12)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildTeacherBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -4))],

      ),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavItem(Icons.grid_view_rounded, 'Dashboard', false),

          _buildNavItem(Icons.volunteer_activism, 'Projects', true),

          _buildNavItem(Icons.rate_review, 'Reviews', false),

          _buildNavItem(Icons.person_outline, 'Profile', false),

        ],

      ),

    );

  }

}

class _buildNavItem extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isSelected;

  const _buildNavItem(this.icon, this.label, this.isSelected);

  @override

  Widget build(BuildContext context) {

    return Column(

      mainAxisSize: MainAxisSize.min,

      children: [

        Icon(icon, color: isSelected ? AppTheme.primary : Colors.grey[400], size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? AppTheme.primary : Colors.grey[600], fontSize: 10, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),

      ],

    );

  }

}
