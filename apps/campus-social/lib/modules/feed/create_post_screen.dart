import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/modules/feed/post_status_screen.dart';

class CreatePostScreen extends StatefulWidget {
  const CreatePostScreen({super.key});

  @override
  State<CreatePostScreen> createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  final TextEditingController _controller = TextEditingController();
  int _charCount = 0;
  List<String> _selectedMedia = [];

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      setState(() => _charCount = _controller.text.length);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _addMedia() async {
    // In a real app, this would use image_picker. 
    // Here we'll simulate selecting a few images.
    setState(() {
      if (_selectedMedia.length < 3) {
        _selectedMedia.add('https://picsum.photos/seed/${_selectedMedia.length + 10}/800');
      }
    });
  }

  void _submitPost() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => const PostStatusScreen(),
    ).then((_) {
      if (mounted) Navigator.pop(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Create Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ElevatedButton(
              onPressed: _controller.text.isNotEmpty || _selectedMedia.isNotEmpty ? _submitPost : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF00A870),
                foregroundColor: Colors.white,
                disabledBackgroundColor: Colors.grey[200],
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                elevation: 0,
              ),
              child: const Text('Post', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildUserInfo(isDark),
                  const SizedBox(height: 32),
                  TextField(
                    controller: _controller,
                    maxLines: null,
                    autofocus: true,
                    decoration: InputDecoration(
                      hintText: "What's on your mind, Alex?",
                      hintStyle: TextStyle(
                        color: Colors.grey[400],
                        fontSize: 20,
                        fontWeight: FontWeight.normal,
                      ),
                      border: InputBorder.none,
                    ),
                    style: const TextStyle(fontSize: 20),
                  ),
                  if (_selectedMedia.isNotEmpty) ...[
                    const SizedBox(height: 24),
                    _buildMediaPreview(isDark),
                  ],
                  const SizedBox(height: 48),
                  _buildQuickActionsRow(isDark),
                ],
              ),
            ),
          ),
          _buildStatusBar(isDark),
        ],
      ),
    );
  }

  Widget _buildUserInfo(bool isDark) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 24,
          backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera'),
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Alex Rivera', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: isDark ? Colors.white10 : Colors.grey[100],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.public, color: Colors.grey[600], size: 12),
                  const SizedBox(width: 4),
                  Text(
                    'Public',
                    style: TextStyle(color: Colors.grey[600], fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                  Icon(Icons.arrow_drop_down, color: Colors.grey[600], size: 14),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildMediaPreview(bool isDark) {
    return SizedBox(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _selectedMedia.length + 1,
        itemBuilder: (context, index) {
          if (index == _selectedMedia.length) {
            return GestureDetector(
              onTap: _addMedia,
              child: Container(
                width: 120,
                margin: const EdgeInsets.only(right: 12),
                decoration: BoxDecoration(
                  color: isDark ? Colors.white10 : Colors.grey[100],
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
                ),
                child: const Icon(Icons.add_photo_alternate_outlined, color: Colors.grey),
              ),
            );
          }
          return Stack(
            children: [
              Container(
                width: 120,
                margin: const EdgeInsets.only(right: 12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  image: DecorationImage(
                    image: NetworkImage(_selectedMedia[index]),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned(
                top: 4,
                right: 16,
                child: GestureDetector(
                  onTap: () => setState(() => _selectedMedia.removeAt(index)),
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: Colors.black54,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.close, color: Colors.white, size: 14),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildQuickActionsRow(bool isDark) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        _buildActionChip(Icons.photo_library, 'Photo/Video', const Color(0xFFE3FBEF), const Color(0xFF007A5E), _addMedia),
        _buildActionChip(Icons.person_add, 'Tag Friends', const Color(0xFFF0F2FF), const Color(0xFF4C51BF), () {}),
        _buildActionChip(Icons.location_on, 'Location', const Color(0xFFFFF7E6), const Color(0xFFD97706), () {}),
        _buildActionChip(Icons.mood, 'Feeling', const Color(0xFFFFF0F6), const Color(0xFFD53F8C), () {}),
      ],
    );
  }

  Widget _buildActionChip(IconData icon, String label, Color bg, Color fg, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: bg.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: fg.withValues(alpha: 0.1)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: fg, size: 18),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(color: fg, fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBar(bool isDark) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 32),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.cardDark : Colors.white,
        border: Border(top: BorderSide(color: Colors.black.withValues(alpha: 0.05))),
      ),
      child: Row(
        children: [
          Icon(Icons.info_outline, color: Colors.grey[400], size: 16),
          const SizedBox(width: 8),
          Text(
            '$_charCount / 500 characters',
            style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.w500),
          ),
          const Spacer(),
          Text(
            'Auto-save to drafts',
            style: TextStyle(color: Colors.grey[400], fontSize: 11),
          ),
        ],
      ),
    );
  }
}
