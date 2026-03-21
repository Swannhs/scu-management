
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class BookDetailScreen extends StatelessWidget {

  const BookDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: Stack(

        children: [

          CustomScrollView(

            slivers: [

              _buildAppBar(context, isDark),

              SliverToBoxAdapter(

                child: Padding(

                  padding: const EdgeInsets.symmetric(horizontal: 20),

                  child: Column(

                    children: [

                      _buildBookCover(isDark),

                      const SizedBox(height: 24),

                      _buildBookHeader(isDark),

                      const SizedBox(height: 20),

                      _buildAvailabilityBadges(isDark),

                      const SizedBox(height: 32),

                      _buildSummary(isDark),

                      const SizedBox(height: 32),

                      _buildMetadataGrid(isDark),

                      const SizedBox(height: 200), // Space for floating buttons

                    ],

                  ),

                ),

              ),

            ],

          ),

          _buildBottomActions(context, isDark),

        ],

      ),

    );

  }

  Widget _buildAppBar(BuildContext context, bool isDark) {

    return SliverAppBar(

      backgroundColor: (isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight).withOpacity(0.8),

      elevation: 0,

      pinned: true,

      leading: IconButton(

        icon: Icon(Icons.arrow_back, color: isDark ? Colors.white70 : Colors.black87),

        onPressed: () => Navigator.pop(context),

      ),

      title: const Text(

        'Book Details',

        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),

      ),

      actions: [

        IconButton(

          icon: Icon(Icons.share, color: isDark ? Colors.white70 : Colors.black87),

          onPressed: () {},

        ),

      ],

    );

  }

  Widget _buildBookCover(bool isDark) {

    return Center(

      child: Container(

        width: 180,

        height: 270,

        decoration: BoxDecoration(

          borderRadius: BorderRadius.circular(16),

          boxShadow: [

            BoxShadow(

              color: Colors.black.withOpacity(0.3),

              blurRadius: 20,

              offset: const Offset(0, 10),

            ),

          ],

        ),

        child: ClipRRect(

          borderRadius: BorderRadius.circular(16),

          child: Image.network(

            'https://images.unsplash.com/photo-1544383335-c533fd093223?w=600',

            fit: BoxFit.cover,

          ),

        ),

      ),

    );

  }

  Widget _buildBookHeader(bool isDark) {

    return Column(

      children: [

        const Text(

          'Principles of Sustainable Urbanism',

          textAlign: TextAlign.center,

          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, height: 1.2),

        ),

        const SizedBox(height: 8),

        Text(

          'by Dr. Helena Richardson',

          style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, fontWeight: FontWeight.w500),

        ),

        const SizedBox(height: 16),

        Row(

          mainAxisAlignment: MainAxisAlignment.center,

          children: [

            const Icon(Icons.star, color: Colors.orange, size: 20),

            const SizedBox(width: 4),

            const Text('4.8', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            const SizedBox(width: 4),

            Text('(124)', style: TextStyle(color: isDark ? Colors.white30 : Colors.black26, fontSize: 12)),

            const SizedBox(width: 24),

            Container(width: 1, height: 16, color: isDark ? Colors.white10 : Colors.black12),

            const SizedBox(width: 24),

            const Icon(Icons.menu_book, color: AppTheme.primary, size: 20),

            const SizedBox(width: 4),

            const Text('342', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            const SizedBox(width: 4),

            Text('Pages', style: TextStyle(color: isDark ? Colors.white30 : Colors.black26, fontSize: 12)),

          ],

        ),

      ],

    );

  }

  Widget _buildAvailabilityBadges(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.center,

      children: [

        _buildBadge(Icons.check_circle, 'Physical Available', AppTheme.primary, isDark),

        const SizedBox(width: 12),

        _buildBadge(Icons.cloud_done, 'Digital Ready', isDark ? Colors.white54 : Colors.blueGrey, isDark),

      ],

    );

  }

  Widget _buildBadge(IconData icon, String label, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

      decoration: BoxDecoration(

        color: color.withOpacity(0.1),

        borderRadius: BorderRadius.circular(20),

      ),

      child: Row(

        children: [

          Icon(icon, size: 14, color: color),

          const SizedBox(width: 6),

          Text(

            label,

            style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.bold),

          ),

        ],

      ),

    );

  }

  Widget _buildSummary(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Summary', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        const SizedBox(height: 12),

        Text(

          'This comprehensive guide explores the intersection of environmental psychology and urban planning. Dr. Richardson presents a revolutionary framework for designing cities that prioritize both ecological health and human well-being, featuring case studies from across Northern Europe and East Asia.',

          style: TextStyle(

            color: isDark ? Colors.white60 : Colors.black54,

            fontSize: 14,

            height: 1.6,

          ),

        ),

      ],

    );

  }

  Widget _buildMetadataGrid(bool isDark) {

    return GridView.count(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      crossAxisCount: 2,

      childAspectRatio: 2.2,

      crossAxisSpacing: 16,

      mainAxisSpacing: 16,

      children: [

        _buildMetaItem('Publisher', 'Oxford University Press', isDark),

        _buildMetaItem('Published', 'October 2023', isDark),

      ],

    );

  }

  Widget _buildMetaItem(String label, String value, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? Colors.white.withOpacity(0.05) : Colors.grey[50],

        borderRadius: BorderRadius.circular(12),

        border: Border.all(color: isDark ? Colors.white10 : Colors.black.withOpacity(0.02)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 4),

          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

        ],

      ),

    );

  }

  Widget _buildBottomActions(BuildContext context, bool isDark) {

    return Positioned(

      bottom: 20,

      left: 16,

      right: 16,

      child: Row(

        children: [

          Expanded(

            child: ElevatedButton.icon(

              onPressed: () => Navigator.pushNamed(context, '/reservation-success'),

              icon: const Icon(Icons.auto_stories),

              label: const Text('Read Now'),

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary,

                foregroundColor: Colors.white,

                padding: const EdgeInsets.symmetric(vertical: 16),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              ),

            ),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: ElevatedButton.icon(

              onPressed: () {},

              icon: const Icon(Icons.bookmark_add),

              label: const Text('Reserve'),

              style: ElevatedButton.styleFrom(

                backgroundColor: isDark ? Colors.white : Colors.black,

                foregroundColor: isDark ? Colors.black : Colors.white,

                padding: const EdgeInsets.symmetric(vertical: 16),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              ),

            ),

          ),

        ],

      ),

    );

  }

}
