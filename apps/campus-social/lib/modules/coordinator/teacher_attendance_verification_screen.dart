
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherAttendanceVerificationScreen extends StatelessWidget {

  const TeacherAttendanceVerificationScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Attendance Verification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF007A5E))),

        leading: IconButton(icon: const Icon(Icons.arrow_back, color: Color(0xFF007A5E)), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.more_vert, color: Color(0xFF007A5E)), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: Stack(

        children: [

          SingleChildScrollView(

            child: Padding(

              padding: const EdgeInsets.symmetric(horizontal: 24.0),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  _buildHeaderCard(isDark),

                  const SizedBox(height: 32),

                  _buildSearchBar(isDark),

                  const SizedBox(height: 24),

                  _buildAttendanceList(isDark),

                  const SizedBox(height: 120),

                ],

              ),

            ),

          ),

          Positioned(

            bottom: 24,

            left: 24,

            right: 24,

            child: ElevatedButton.icon(

              onPressed: () {},

              icon: const Icon(Icons.verified_user, color: Colors.white),

              label: const Text('Verify All 24 Students', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              style: ElevatedButton.styleFrom(

                backgroundColor: const Color(0xFF008D58),

                foregroundColor: Colors.white,

                minimumSize: const Size(double.infinity, 60),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                elevation: 8,

                shadowColor: const Color(0xFF008D58).withOpacity(0.3),

              ),

            ),

          ),

        ],

      ),

      bottomNavigationBar: _buildAttendanceBottomNav(isDark),

    );

  }

  Widget _buildHeaderCard(bool isDark) {

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

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: const Color(0xFFE9FAEF), borderRadius: BorderRadius.circular(8)),

            child: const Text('MORNING SESSION', style: TextStyle(color: Color(0xFF007A5E), fontSize: 10, fontWeight: FontWeight.bold)),

          ),

          const SizedBox(height: 16),

          const Text('City Park Restoration', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          const SizedBox(height: 16),

          Row(

            children: [

              const Icon(Icons.calendar_today, size: 14, color: Colors.grey),

              const SizedBox(width: 8),

              Text('Oct 24, 2024', style: TextStyle(color: Colors.grey[600], fontSize: 13)),

              const SizedBox(width: 20),

              const Icon(Icons.location_on, size: 14, color: Colors.grey),

              const SizedBox(width: 8),

              Text('Central Sector', style: TextStyle(color: Colors.grey[600], fontSize: 13)),

            ],

          ),

          const SizedBox(height: 16),

          Row(

            children: [

              Icon(Icons.groups, size: 16, color: Color(0xFF007A5E)),

              SizedBox(width: 8),

              Text('24 Students Registered', style: TextStyle(color: Color(0xFF007A5E), fontSize: 13, fontWeight: FontWeight.bold)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSearchBar(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF),

        borderRadius: BorderRadius.circular(12),

      ),

      child: TextField(

        decoration: InputDecoration(

          icon: Icon(Icons.search, color: Colors.grey[500], size: 20),

          hintText: 'Search students by name or ID...',

          hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildAttendanceList(bool isDark) {

    return Column(

      children: [

        _buildStudentItem('Alex Thompson', 'ASTU-2901', 'Checked In', 'https://i.pravatar.cc/150?u=alex_t', isDark),

        const SizedBox(height: 12),

        _buildStudentItem('Sarah Jenkins', 'ASTU-3142', null, 'https://i.pravatar.cc/150?u=sarah_j', isDark),

        const SizedBox(height: 12),

        _buildStudentItem('Marcus Webb', 'ASTU-8821', 'Absent', 'https://i.pravatar.cc/150?u=marcus_w', isDark),

        const SizedBox(height: 12),

        _buildStudentItem('Elena Rodriguez', 'ASTU-4402', 'Excused', 'https://i.pravatar.cc/150?u=elena_r', isDark),

        const SizedBox(height: 12),

        _buildStudentItem('Jordan Smith', 'ASTU-9231', null, 'https://i.pravatar.cc/150?u=jordan_s', isDark),

      ],

    );

  }

  Widget _buildStudentItem(String name, String id, String? status, String imageUrl, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.01), blurRadius: 4, offset: const Offset(0, 2))],

      ),

      child: Column(

        children: [

          Row(

            children: [

              CircleAvatar(radius: 20, backgroundImage: NetworkImage(imageUrl)),

              const SizedBox(width: 12),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                    Text('ID: #$id', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                  ],

                ),

              ),

              const SizedBox(width: 8),

              _buildAttendanceToggle(status, isDark),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildAttendanceToggle(String? activeStatus, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(4),

      decoration: BoxDecoration(

        color: isDark ? Colors.white12 : const Color(0xFFF1F3F5),

        borderRadius: BorderRadius.circular(10),

      ),

      child: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          _buildToggleButton('Checked In', activeStatus == 'Checked In', const Color(0xFF007D53)),

          _buildToggleButton('Absent', activeStatus == 'Absent', const Color(0xFFD32F2F)),

          _buildToggleButton('Excused', activeStatus == 'Excused', const Color(0xFF6B7280)),

        ],

      ),

    );

  }

  Widget _buildToggleButton(String label, bool isSelected, Color activeColor) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

      decoration: BoxDecoration(

        color: isSelected ? activeColor : Colors.transparent,

        borderRadius: BorderRadius.circular(8),

      ),

      child: Text(

        label.split(' ').last,

        style: TextStyle(

          color: isSelected ? Colors.white : Colors.grey[600],

          fontSize: 10,

          fontWeight: FontWeight.bold,

        ),

      ),

    );

  }

  Widget _buildAttendanceBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        border: Border(top: BorderSide(color: Colors.grey[200]!)),

      ),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavItem(Icons.calendar_today, 'Sessions', true),

          _buildNavItem(Icons.people_outline, 'Students', false),

          _buildNavItem(Icons.bar_chart, 'Reports', false),

          _buildNavItem(Icons.settings_outlined, 'Settings', false),

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

        Icon(icon, color: isSelected ? const Color(0xFF008D58) : Colors.grey, size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? const Color(0xFF008D58) : Colors.grey, fontSize: 10, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),

      ],

    );

  }

}
