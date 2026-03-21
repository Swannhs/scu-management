import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';

enum PostType { text, singleImage, multiImage, video, event }

class SocialPostCard extends StatelessWidget {
  final PostType type;
  final String authorName;
  final String authorRole;
  final String? authorImageUrl;
  final String time;
  final String content;
  final List<String> imageUrls;
  final int likes;
  final int comments;
  final bool isOfficial;
  final String? eventTitle;
  final String? eventBadge;
  final VoidCallback? onTap;
  final VoidCallback? onLike;
  final VoidCallback? onComment;
  final VoidCallback? onShare;

  const SocialPostCard({
    super.key,
    this.type = PostType.text,
    this.authorName = 'Elena Rodriguez',
    this.authorRole = 'Student',
    this.authorImageUrl,
    this.time = '2h ago',
    this.content = 'Incredible turn out for the solar engineering workshop today!',
    this.imageUrls = const [],
    this.likes = 0,
    this.comments = 0,
    this.isOfficial = false,
    this.eventTitle,
    this.eventBadge,
    this.onTap,
    this.onLike,
    this.onComment,
    this.onShare,
  });

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.cardDark : Colors.white,
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.04),
              blurRadius: 15,
              offset: const Offset(0, 4),
            ),
          ],
          border: Border.all(
            color: isDark ? Colors.white10 : Colors.black.withValues(alpha: 0.03),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildAuthorHeader(isDark),
            const SizedBox(height: 14),
            Text(
              content,
              style: TextStyle(
                fontSize: 15,
                height: 1.5,
                color: isDark ? Colors.white.withValues(alpha: 0.9) : Colors.black87,
              ),
            ),
            if (type != PostType.text) ...[
              const SizedBox(height: 16),
              _buildMediaContent(isDark),
            ],
            const SizedBox(height: 18),
            _buildInteractionBar(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildAuthorHeader(bool isDark) {
    return Row(
      children: [
        CircleAvatar(
          radius: 20,
          backgroundColor: AppTheme.primary.withValues(alpha: 0.1),
          backgroundImage: authorImageUrl != null 
            ? NetworkImage(authorImageUrl!) 
            : NetworkImage('https://i.pravatar.cc/150?u=${authorName.hashCode}'),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    authorName,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  if (isOfficial) ...[
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFFC0FBD8),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Text(
                        'OFFICIAL',
                        style: TextStyle(
                          color: Color(0xFF007A5E),
                          fontSize: 8,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
              Text(
                '$authorRole • $time',
                style: TextStyle(
                  color: Colors.grey[500],
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
        IconButton(
          icon: const Icon(Icons.more_horiz, color: Colors.grey, size: 20),
          onPressed: () {},
          visualDensity: VisualDensity.compact,
        ),
      ],
    );
  }

  Widget _buildMediaContent(bool isDark) {
    switch (type) {
      case PostType.singleImage:
        return _buildSingleImage();
      case PostType.multiImage:
        return _buildMultiImage();
      case PostType.video:
        return _buildVideo();
      case PostType.event:
        return _buildEventBanner();
      default:
        return const SizedBox.shrink();
    }
  }

  Widget _buildSingleImage() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: Image.network(
        imageUrls.isNotEmpty ? imageUrls[0] : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
        height: 200,
        width: double.infinity,
        fit: BoxFit.cover,
      ),
    );
  }

  Widget _buildMultiImage() {
    if (imageUrls.length < 2) return _buildSingleImage();
    return Row(
      children: [
        Expanded(
          flex: 2,
          child: ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              bottomLeft: Radius.circular(16),
            ),
            child: Image.network(imageUrls[0], height: 200, fit: BoxFit.cover),
          ),
        ),
        const SizedBox(width: 4),
        Expanded(
          flex: 1,
          child: Column(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.only(topRight: Radius.circular(16)),
                child: Image.network(imageUrls[1], height: 98, width: double.infinity, fit: BoxFit.cover),
              ),
              const SizedBox(height: 4),
              ClipRRect(
                borderRadius: const BorderRadius.only(bottomRight: Radius.circular(16)),
                child: imageUrls.length > 2 
                  ? Stack(
                      fit: StackFit.passthrough,
                      children: [
                        Image.network(imageUrls[2], height: 98, fit: BoxFit.cover),
                        if (imageUrls.length > 3)
                          Container(
                            height: 98,
                            color: Colors.black45,
                            child: Center(
                              child: Text(
                                '+${imageUrls.length - 3}',
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                              ),
                            ),
                          ),
                      ],
                    )
                  : Image.network('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800', height: 98, fit: BoxFit.cover),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildVideo() {
    return Stack(
      alignment: Alignment.center,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            imageUrls.isNotEmpty ? imageUrls[0] : 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
            height: 200,
            width: double.infinity,
            fit: BoxFit.cover,
          ),
        ),
        CircleAvatar(
          radius: 28,
          backgroundColor: Colors.black.withValues(alpha: 0.4),
          child: const Icon(Icons.play_arrow, color: Colors.white, size: 36),
        ),
        Positioned(
          bottom: 12,
          right: 12,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(6),
            ),
            child: const Text('1:24', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
          ),
        ),
      ],
    );
  }

  Widget _buildEventBanner() {
    return Container(
      height: 180,
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF14453A),
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'CAMPUS EVENT',
                style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 2),
              ),
              if (eventBadge != null)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.primary,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    eventBadge!,
                    style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                  ),
                ),
            ],
          ),
          const Spacer(),
          Text(
            eventTitle ?? 'University Gala 2024',
            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            'Saturday • 13 April, 2024 • 8:30 PM',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 12),
          ),
          const Spacer(),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: const Color(0xFF14453A),
              minimumSize: const Size(double.infinity, 40),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('View Event Details', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildInteractionBar(bool isDark) {
    return Row(
      children: [
        _buildStatItem(Icons.thumb_up_alt_outlined, likes, isDark, onLike),
        const SizedBox(width: 24),
        _buildStatItem(Icons.chat_bubble_outline, comments, isDark, onComment),
        const Spacer(),
        IconButton(
          icon: const Icon(Icons.share_outlined, color: Colors.grey, size: 20),
          onPressed: onShare,
          padding: EdgeInsets.zero,
          constraints: const BoxConstraints(),
        ),
        const SizedBox(width: 16),
        IconButton(
          icon: const Icon(Icons.bookmark_border, color: Colors.grey, size: 20),
          onPressed: () {},
          padding: EdgeInsets.zero,
          constraints: const BoxConstraints(),
        ),
      ],
    );
  }

  Widget _buildStatItem(IconData icon, int count, bool isDark, VoidCallback? onPressed) {
    return InkWell(
      onTap: onPressed,
      child: Row(
        children: [
          Icon(icon, color: Colors.grey[600], size: 20),
          const SizedBox(width: 6),
          Text(
            '$count',
            style: TextStyle(
              color: Colors.grey[600],
              fontSize: 13,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
