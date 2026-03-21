
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SelectMediaScreen extends StatefulWidget {

  const SelectMediaScreen({super.key});

  @override

  State<SelectMediaScreen> createState() => _SelectMediaScreenState();

}

class _SelectMediaScreenState extends State<SelectMediaScreen> {

  final List<int> _selectedIndices = [0, 2]; // Mocked some selected indices

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,

      appBar: AppBar(

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        title: const Text('Select Media', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF1B4D3E))),

        actions: [

          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Done', style: TextStyle(color: Color(0xFF00A870), fontWeight: FontWeight.bold, fontSize: 16))),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        centerTitle: true,

      ),

      body: Column(

        children: [

          _buildCategoryHeader(isDark),

          Expanded(child: _buildMediaGrid(isDark)),

          _buildBottomNav(isDark),

        ],

      ),

      floatingActionButton: _buildSelectionPill(isDark),

      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,

    );

  }

  Widget _buildCategoryHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              const Text('Recent Media ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

              Icon(Icons.keyboard_arrow_down, color: Colors.grey[600], size: 24),

            ],

          ),

          Icon(Icons.grid_view_outlined, color: Colors.grey[400], size: 24),

        ],

      ),

    );

  }

  Widget _buildMediaGrid(bool isDark) {

    return GridView.builder(

      padding: const EdgeInsets.all(2),

      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, crossAxisSpacing: 2, mainAxisSpacing: 2),

      itemCount: 18,

      itemBuilder: (context, index) {

        bool isSelected = _selectedIndices.contains(index);

        bool isVideo = index == 2 || index == 7;

        

        return GestureDetector(

          onTap: () {

            setState(() {

              if (isSelected) {

                _selectedIndices.remove(index);

              } else {

                _selectedIndices.add(index);

              }

            });

          },

          child: Stack(

            children: [

              Container(

                decoration: BoxDecoration(

                  image: DecorationImage(image: NetworkImage('https://picsum.photos/seed/$index/400'), fit: BoxFit.cover),

                  border: isSelected ? Border.all(color: const Color(0xFF00A870), width: 3) : null,

                ),

              ),

              if (isVideo)

                Positioned(

                  bottom: 8,

                  left: 8,

                  child: Container(

                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),

                    decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(4)),

                    child: Row(

                      children: [

                        const Icon(Icons.play_arrow, color: Colors.white, size: 10),

                        const SizedBox(width: 4),

                        Text(index == 2 ? '0:15' : '1:04', style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),

                      ],

                    ),

                  ),

                ),

              if (isSelected)

                Positioned(

                  top: 8,

                  right: 8,

                  child: Container(

                    width: 24,

                    height: 24,

                    decoration: BoxDecoration(color: const Color(0xFF00A870), shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),

                    child: Center(child: Text('${_selectedIndices.indexOf(index) + 1}', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold))),

                  ),

                ),

            ],

          ),

        );

      },

    );

  }

  Widget _buildSelectionPill(bool isDark) {

    if (_selectedIndices.isEmpty) return const SizedBox.shrink();

    

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),

      decoration: BoxDecoration(

        color: const Color(0xFF2D3748),

        borderRadius: BorderRadius.circular(30),

      ),

      child: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          Text('${_selectedIndices.length} items selected', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),

          const SizedBox(width: 16),

          const VerticalDivider(color: Colors.white24, width: 1, indent: 4, endIndent: 4),

          const SizedBox(width: 16),

          const Text('Review', style: TextStyle(color: Color(0xFF00A870), fontSize: 13, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

  Widget _buildBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, border: Border(top: BorderSide(color: Colors.grey[200]!))),

      padding: const EdgeInsets.symmetric(vertical: 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavIcon(Icons.collections, true, isDark),

          _buildNavIcon(Icons.play_circle_outline, false, isDark),

          _buildNavIcon(Icons.camera_alt_outlined, false, isDark),

          _buildNavIcon(Icons.settings_outlined, false, isDark),

        ],

      ),

    );

  }

  Widget _buildNavIcon(IconData icon, bool isActive, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: isActive ? BoxDecoration(color: const Color(0xFFE6F6F1), borderRadius: BorderRadius.circular(12)) : null,

      child: Icon(icon, color: isActive ? const Color(0xFF00A870) : Colors.grey[400]),

    );

  }

}
