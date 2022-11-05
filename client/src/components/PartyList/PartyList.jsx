import React from 'react';
import { useQuery } from 'react-query';
import { Card } from './Card';
import { showPartyList } from './../../api/Parties';
import { Wrapper, Board } from './PartyList.styles';
import platform from '../../mocks/platform';

function PartyList() {
  const accessToken = localStorage.getItem('access-token');

  const getBoardList = () => {
    return showPartyList(accessToken).then((res) => res.data);
  };

  // 파티 리스트가 [{}, {}] 형태로 data에 쌓임
  const { data } = useQuery('getBoardList', getBoardList);

  return (
    <>
      <Wrapper>
        {/* data가 있을 경우에만 렌더링  */}
        {data && (
          <Board>
            {data.map((party) => (
              <Card
                // map 사용 시 key 값 필수 -> 유니크한 값 (보통 index나 id 사용 )
                key={party.id}
                // platform 중에 ottId 가 같은 것만 모아서 새 배열로 리턴
                ottUrl={party.ottId ? platform.filter((a) => a.id === party.ottId) : ''}
                title={party.title}
                people={party.people}
              />
            ))}
          </Board>
        )}
      </Wrapper>
    </>
  );
}

export default PartyList;
