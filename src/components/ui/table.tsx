import React from 'react'

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = (props) => (
  <table {...props} className="min-w-full divide-y divide-gray-200" />
)

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <thead {...props} className="bg-gray-50" />
)

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = (props) => (
  <tbody {...props} className="bg-white divide-y divide-gray-200" />
)

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = (props) => (
  <tr {...props} />
)

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <th {...props} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
)

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) => (
  <td {...props} className="px-6 py-4 whitespace-nowrap" />
)

