import { render, screen, waitFor } from '@testing-library/react';
import CrowdFunding from './CrowedFunding';
import { fetchCrowdFunding } from '../../services/api/crowdFunding';
import { CrowedFundingType } from '../../types/crowedFundingType';

jest.mock('../../services/api/crowdFunding', () => ({
  fetchCrowdFunding: jest.fn()
}));

describe('CrowedFunding Component', () => {
  const mockData: CrowedFundingType[] = [
    {
      's.no': 0,
      'amt.pledged': 15823,
      blurb:
        "'Catalysts, Explorers & Secret Keepers: Women of Science Fiction' is a take-home exhibit & anthology by the Museum of Science Fiction.",
      by: 'Museum of Science Fiction',
      country: 'US',
      currency: 'usd',
      'end.time': '2016-11-01T23:59:00-04:00',
      location: 'Washington, DC',
      'percentage.funded': 186,
      'num.backers': '219382',
      state: 'DC',
      title: 'Catalysts, Explorers & Secret Keepers: Women of SF',
      type: 'Town',
      url: '/projects/1608905146/catalysts-explorers-and-secret-keepers-women-of-sf?ref=discovery'
    },
    {
      's.no': 1,
      'amt.pledged': 6859,
      blurb:
        'A unique handmade picture book for kids & art lovers about a nervous monster who finds his courage with the help of a brave little girl',
      by: 'Tyrone Wells & Broken Eagle, LLC',
      country: 'US',
      currency: 'usd',
      'end.time': '2016-11-25T01:13:33-05:00',
      location: 'Portland, OR',
      'percentage.funded': 8,
      'num.backers': '154926',
      state: 'OR',
      title: 'The Whatamagump (a hand-crafted story picture book)',
      type: 'Town',
      url: '/projects/thewhatamagump/the-whatamagump-a-hand-crafted-story-picture-book?ref=discovery'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SHould render loading state initially', async () => {
    (fetchCrowdFunding as jest.Mock).mockResolvedValueOnce([]);

    render(<CrowdFunding />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(fetchCrowdFunding).toHaveBeenCalledTimes(1));
  });

  it('Should render data in the table when API call succeeds', async () => {
    (fetchCrowdFunding as jest.Mock).mockResolvedValueOnce(mockData);

    render(<CrowdFunding />);

    await waitFor(() => {
      expect(screen.queryByRole('table')).toBeInTheDocument();
    });
  });

  it('Should render error message when API call fails', async () => {
    const mockErrorMessage = 'Failed to fetch data';
    (fetchCrowdFunding as jest.Mock).mockRejectedValueOnce(
      new Error(mockErrorMessage)
    );

    render(<CrowdFunding />);

    await waitFor(() => {
      expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    });
  });

  it('Should render pagination when there is data', async () => {
    (fetchCrowdFunding as jest.Mock).mockResolvedValueOnce(mockData);

    render(<CrowdFunding />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /previous/i })
      ).toBeInTheDocument();
    });
  });

  it('Should not render table or pagination when there is no data', async () => {
    (fetchCrowdFunding as jest.Mock).mockResolvedValueOnce([]);

    render(<CrowdFunding />);

    await waitFor(() => {
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /next/i })
      ).not.toBeInTheDocument();
    });
  });
});
