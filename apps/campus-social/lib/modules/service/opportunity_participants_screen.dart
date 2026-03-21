
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class OpportunityParticipantsScreen extends StatelessWidget {

  const OpportunityParticipantsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: Column(

          children: [

            const Text('Opportunity Participants', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            Text('CITY PARK RESTORATION', style: TextStyle(color: const Color(0xFF007A5E), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

          ],

        ),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.search), onPressed: () {}),

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildSummaryCard(isDark),

              const SizedBox(height: 32),

              _buildSearchAndFilters(isDark),

              const SizedBox(height: 32),

              const Text('PARTICIPANT DIRECTORY', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

              const SizedBox(height: 16),

              _buildParticipantList(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () {},

        backgroundColor: const Color(0xFF007A5E),

        child: const Icon(Icons.person_add, color: Colors.white),

      ),

      bottomNavigationBar: _buildParticipantsBottomNav(isDark),

    );

  }

  Widget _buildSummaryCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text('Total Participants', style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.bold)),

              const SizedBox(height: 4),

              Row(

                crossAxisAlignment: CrossAxisAlignment.baseline,

                textBaseline: TextBaseline.alphabetic,

                children: [

                  const Text('24', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1)),

                  const SizedBox(width: 8),

                  Text('Students', style: TextStyle(color: Colors.grey[400], fontSize: 18, fontWeight: FontWeight.bold)),

                ],

              ),

            ],

          ),

          _buildFacePile(),

        ],

      ),

    );

  }

  Widget _buildFacePile() {

    return SizedBox(

      width: 120,

      height: 40,

      child: Stack(

        children: [

          Positioned(left: 0, child: _buildCircularFace('https://i.pravatar.cc/150?u=1')),

          Positioned(left: 25, child: _buildCircularFace('https://i.pravatar.cc/150?u=2')),

          Positioned(left: 50, child: _buildCircularFace('https://i.pravatar.cc/150?u=3')),

          Positioned(

            left: 75,

            child: Container(

              width: 40,

              height: 40,

              decoration: BoxDecoration(color: const Color(0xFF00A870), shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),

              child: Center(child: Text('+21', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold))),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildCircularFace(String url) {

    return Container(

      width: 40,

      height: 40,

      decoration: BoxDecoration(

        shape: BoxShape.circle,

        border: Border.all(color: Colors.white, width: 2),

        image: DecorationImage(image: NetworkImage(url), fit: BoxFit.cover),

      ),

    );

  }

  Widget _buildSearchAndFilters(bool isDark) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 16),

          height: 56,

          decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF).withOpacity(0.5), borderRadius: BorderRadius.circular(12)),

          child: TextField(

            decoration: InputDecoration(

              icon: Icon(Icons.search, color: Colors.grey[400]),

              hintText: 'Search students...',

              hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),

              border: InputBorder.none,

            ),

          ),

        ),

        const SizedBox(height: 16),

        SingleChildScrollView(

          scrollDirection: Axis.horizontal,

          child: Row(

            children: [

              _buildFilterPill('All', true),

              const SizedBox(width: 8),

              _buildFilterPill('Pending', false),

              const SizedBox(width: 8),

              _buildFilterPill('Approved', false),

              const SizedBox(width: 8),

              _buildFilterPill('Completed', false),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildFilterPill(String label, bool isSelected) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),

      decoration: BoxDecoration(

        color: isSelected ? const Color(0xFF007A5E) : const Color(0xFFE9ECEF).withOpacity(0.5),

        borderRadius: BorderRadius.circular(20),

      ),

      child: Text(

        label,

        style: TextStyle(color: isSelected ? Colors.white : Colors.grey[600], fontSize: 12, fontWeight: FontWeight.bold),

      ),

    );

  }

  Widget _buildParticipantList(bool isDark) {

    return Column(

      children: [

        _buildParticipantCard('Marcus Holloway', 'APPROVED', '11th Grade', 'Present', 'Verified', 'https://i.pravatar.cc/150?u=marcus_h', isDark),

        const SizedBox(height: 16),

        _buildParticipantCard('Elena Rodriguez', 'PENDING', '12th Grade', 'Pending', 'Under Review', 'https://i.pravatar.cc/150?u=elena_r_v3', isDark),

        const SizedBox(height: 16),

        _buildParticipantCard('Jordan Smith', 'APPROVED', '10th Grade', 'Absent', 'Not Submitted', 'https://i.pravatar.cc/150?u=jordan_s_v3', isDark),

      ],

    );

  }

  Widget _buildParticipantCard(String name, String status, String grade, String attendance, String submission, String imageUrl, bool isDark) {

    Color statusBg = status == 'APPROVED' ? const Color(0xFFE3FBEF) : const Color(0xFFFFF1F1);

    Color statusFg = status == 'APPROVED' ? const Color(0xFF007A5E) : const Color(0xFFD32F2F);

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        children: [

          Row(

            children: [

              CircleAvatar(radius: 28, backgroundImage: NetworkImage(imageUrl)),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    const SizedBox(height: 4),

                    Row(

                      children: [

                        Container(

                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                          decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(6)),

                          child: Text(status, style: TextStyle(color: statusFg, fontSize: 9, fontWeight: FontWeight.bold)),

                        ),

                        const SizedBox(width: 8),

                        Text('• $grade', style: TextStyle(color: Colors.grey[400], fontSize: 11)),

                      ],

                    ),

                  ],

                ),

              ),

              IconButton(icon: const Icon(Icons.more_vert, size: 20, color: Colors.grey), onPressed: () {}),

            ],

          ),

          const SizedBox(height: 20),

          const Divider(height: 1),

          const SizedBox(height: 16),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              _buildStatDetail('ATTENDANCE', attendance, isDark),

              _buildStatDetail('SUBMISSION', submission, isDark, isEnd: true),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildStatDetail(String label, String value, bool isDark, {bool isEnd = false}) {

    IconData icon;

    Color iconColor;

    if (value == 'Present' || value == 'Verified') {

      icon = Icons.check_circle;

      iconColor = const Color(0xFF007A5E);

    } else if (value == 'Pending' || value == 'Under Review') {

      icon = Icons.access_time_filled;

      iconColor = Colors.grey[400]!;

    } else {

      icon = Icons.cancel;

      iconColor = const Color(0xFFD32F2F);

    }

    return Column(

      crossAxisAlignment: isEnd ? CrossAxisAlignment.end : CrossAxisAlignment.start,

      children: [

        Text(label, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

        const SizedBox(height: 8),

        Row(

          mainAxisSize: MainAxisSize.min,

          children: [

            if (!isEnd) ...[Icon(icon, color: iconColor, size: 14), const SizedBox(width: 6)],

            Text(value, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: isDark ? Colors.white : Colors.black)),

            if (isEnd) ...[const SizedBox(width: 6), Icon(icon, color: iconColor, size: 14)],

          ],

        ),

      ],

    );

  }

  Widget _buildParticipantsBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, border: Border(top: BorderSide(color: Colors.grey[200]!))),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _NavIcon(Icons.people, 'Students', true),

          _NavIcon(Icons.volunteer_activism_outlined, 'Programs', false),

          _NavIcon(Icons.how_to_reg, 'Attendance', false),

          _NavIcon(Icons.person_outline, 'Profile', false),

        ],

      ),

    );

  }

}

class _NavIcon extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isSelected;

  const _NavIcon(this.icon, this.label, this.isSelected);

  @override

  Widget build(BuildContext context) {

    return Column(

      mainAxisSize: MainAxisSize.min,

      children: [

        Icon(icon, color: isSelected ? const Color(0xFF007A5E) : Colors.grey[400], size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? const Color(0xFF007A5E) : Colors.grey[600], fontSize: 10, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),

      ],

    );

  }

}
