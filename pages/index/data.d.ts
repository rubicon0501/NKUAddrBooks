export interface DataListItem {
    id: number,
    name: string,
    grade: number,
    tel: string,
    sex: string,
  
  
    college?: string,
    job?: string,
    region?: string,
  
    check_id?: number | string
    expand_value?: string
  }