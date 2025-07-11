import { supabase } from '@/backend/common/utils/supabaseClient';
import { ContactMessageEntity } from '@/backend/chats/messages/domains/entities/contactMessage';
import { IContactMessageRepository } from '@/backend/chats/messages/domains/repositories/ContactMessageRepository';
import { ContactMessageMapper } from '@/backend/chats/messages/infrastructures/mappers/ContactMessageMapper';

export class SbContactMessageRepository implements IContactMessageRepository {
  // 메시지 저장
  async create(message: ContactMessageEntity): Promise<ContactMessageEntity> {
    console.log('[Repository] 메시지 생성 시작:', {
      senderId: message.senderId,
      contactRoomId: message.contactRoomId,
      message: message.message,
    });

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        sender_id: message.senderId,
        contact_room_id: message.contactRoomId,
        message: message.message,
      })
      .select()
      .single();

    if (error) {
      console.error('[Repository] 메시지 생성 오류:', error);
      throw error;
    }

    if (!data) {
      console.error('[Repository] 메시지 생성 실패 - 데이터 없음');
      throw new Error('메시지 생성 실패');
    }

    console.log('[Repository] 메시지 생성 성공:', {
      id: data.id,
      senderId: data.sender_id,
      contactRoomId: data.contact_room_id,
      message: data.message,
      createdAt: data.created_at,
    });

    console.log(
      '[Repository] Supabase Realtime 이벤트 발생 예상 - contact_messages 테이블 INSERT'
    );
    console.log('[Repository] 구독자들이 이 이벤트를 받아야 함');

    return ContactMessageMapper.toEntity(data);
  }

  // 메시지 리스트 조회
  async findByContactRoomId(
    contactRoomId: number
  ): Promise<ContactMessageEntity[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('contact_room_id', contactRoomId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    if (!data) return [];

    return data.map(
      (row: {
        id: number;
        contact_room_id: number;
        sender_id: number;
        message: string;
        created_at: string;
      }) => ContactMessageMapper.toEntity(row)
    );
  }

  // 실시간 구독 (프론트엔드에서 주로 사용)
  subscribeToMessages(
    contactRoomId: number,
    onMessage: (message: ContactMessageEntity) => void
  ) {
    return supabase
      .channel('contact_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_messages',
          filter: `contact_room_id=eq.${contactRoomId}`,
        },
        (payload) => {
          onMessage(ContactMessageMapper.toEntity(payload.new));
        }
      )
      .subscribe();
  }
}
